import React, {useEffect, useState, useRef} from 'react';
import {View, Text} from 'react-native';
import List from './List';
import AddItemInput from './AddItemInput';
import _ from 'lodash';

import {firebase} from '../src/firebase/config';

// Added to work around an with the firebase connection
// See https://github.com/firebase/firebase-js-sdk/issues/2923
// There may be a better way to fix it, but this works
firebase.firestore().settings({experimentalForceLongPolling: true});

const TodoList = ({listId}) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const listRef = firebase
    .firestore()
    .collection('lists')
    .doc(listId);

  // We only try to update the text of a todo 500ms after the user has stopped typing.
  // This makes the UI less janky and stops us hammering the DB with updates.
  const delayedTextUpdate = useRef(
    _.debounce((id, text) => {
      listRef
        .collection('todos')
        .doc(id)
        .update({text});
    }, 500),
  ).current;

  useEffect(() => {
    listRef
      .collection('todos')
      .orderBy('createdAt')
      .onSnapshot(snap => {
        const todos = snap.docs.map(doc => ({...doc.data(), id: doc.id}));
        setTodos(todos);
        setLoading(false);
      });
  }, []);

  const openTodos = todos.filter(todo => !todo.completed);
  const closedTodos = todos.filter(todo => todo.completed);

  const setCompleted = (id, completed) => {
    listRef
      .collection('todos')
      .doc(id)
      .update({completed});
  };

  const updateTodoText = (id, text) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? {...todo, text} : todo,
    );

    setTodos(updatedTodos);
    delayedTextUpdate(id, text);
  };

  const addTodo = text => {
    const todo = {
      text: text,
      authorId: 'myUserId',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      completed: false,
    };

    listRef.collection('todos').add(todo);
  };

  const removeTodo = id => {
    listRef
      .collection('todos')
      .doc(id)
      .delete();
  };

  if (loading) {
    return <Text style={{fontSize: 20}}>Loading...</Text>;
  }

  return (
    <View>
      {/* Todos*/}
      <List
        items={openTodos}
        onCompletedChange={setCompleted}
        onTextChange={updateTodoText}
        onDelete={removeTodo}
      />
      {/* Add a new todo */}
      <AddItemInput style={{marginBottom: 20}} onAdd={addTodo} />
      {/* Completed todos*/}
      <List
        items={closedTodos}
        onCompletedChange={setCompleted}
        onDelete={removeTodo}
      />
    </View>
  );
};

export default TodoList;
