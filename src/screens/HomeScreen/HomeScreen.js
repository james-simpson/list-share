import React from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {firebase} from '../../firebase/config';
import TodoList from '../../../components/TodoList';

const onLogoutPress = () => {
  firebase.auth().signOut();
};

export default function HomeScreen(props) {
  // TODO - don't hardcode
  const listId = 'rafEvIFrryiaU2u4Ezq7';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onLogoutPress()}>
        <Text style={styles.buttonTitle}>Log out</Text>
      </TouchableOpacity>
      {/* keyboardShouldPersistTaps='always' allows moving focus from
          one TextInput to another within a ScrollView in one touch */}
      <ScrollView keyboardShouldPersistTaps="always">
        <TodoList listId={listId} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f781',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    backgroundColor: '#788eec',
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 10,
    width: 100,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'roboto',
  },
});
