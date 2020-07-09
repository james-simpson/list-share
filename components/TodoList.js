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

  const todosRef = firebase
    .firestore()
    .collection('lists')
    .doc(listId)
    .collection('todos');

  // We only try to update the text of a todo 500ms after the user has stopped typing.
  // This makes the UI less janky and stops us hammering the DB with updates.
  const delayedTextUpdate = useRef(
    _.debounce((id, text) => {
      todosRef.doc(id).update({text});
    }, 500),
  ).current;

  useEffect(() => {
    todosRef.orderBy('createdAt').onSnapshot(snap => {
      const todos = snap.docs.map(doc => ({...doc.data(), id: doc.id}));
      setTodos(todos);
      setLoading(false);
    });
  }, []);

  const openTodos = todos.filter(todo => !todo.completed);
  const closedTodos = todos.filter(todo => todo.completed);

  // Create
  const addTodo = text => {
    const todo = {
      text: text,
      // TODO - use real user id
      authorId: 'myUserId',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      completed: false,
    };

    todosRef.add(todo);
  };

  // Update
  const updateCompleted = (id, completed) => {
    todosRef.doc(id).update({completed});
  };

  const updateTodoText = (id, text) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? {...todo, text} : todo,
    );

    setTodos(updatedTodos);
    delayedTextUpdate(id, text);
  };

  // Delete
  const removeTodo = id => {
    todosRef.doc(id).delete();
  };

  // Render
  if (loading) {
    return <Text style={{fontSize: 20}}>Loading...</Text>;
  }

  return (
    <View>
      {/* Todos*/}
      <List
        items={openTodos}
        onCompletedChange={updateCompleted}
        onTextChange={updateTodoText}
        onDelete={removeTodo}
      />
      {/* Add a new todo */}
      <AddItemInput style={{marginBottom: 20}} onAdd={addTodo} />
      {/* Completed todos*/}
      <List
        items={closedTodos}
        onCompletedChange={updateCompleted}
        onDelete={removeTodo}
      />
    </View>
  );
};

export default TodoList;
