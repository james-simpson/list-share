import React, {useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import {firebase} from '../../firebase/config';
import TodoList from '../../../components/TodoList';

const onLogoutPress = () => {
  firebase.auth().signOut();
};

async function saveTokenToDatabase(user, token) {
  await firebase
    .firestore()
    .collection('notificationTokens')
    .doc(token)
    .set({userId: user.uid, token});
}

export default function HomeScreen({user}) {
  // TODO - don't hardcode
  const listId = 'rafEvIFrryiaU2u4Ezq7';

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        return saveTokenToDatabase(user, token);
      });

    messaging().onTokenRefresh(token => {
      saveTokenToDatabase(user, token);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onLogoutPress()}>
        <Text style={styles.buttonTitle}>Log out</Text>
      </TouchableOpacity>
      {/* keyboardShouldPersistTaps='always' allows moving focus from
          one TextInput to another within a ScrollView in one touch */}
      <ScrollView keyboardShouldPersistTaps="always">
        <TodoList listId={listId} user={user} />
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
