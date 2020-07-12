// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   KeyboardAvoidingView
// } from 'react-native';

// import { TodoList } from './components'

// const App: () => React$Node = () => {
//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior="padding"
//     >
//       {/* keyboardShouldPersistTaps='always' allows moving focus from
//             one TextInput to another within a ScrollView in one touch */}
//       <ScrollView keyboardShouldPersistTaps='always'>
//         <TodoList />
//       </ScrollView>
//     </KeyboardAvoidingView>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f781',
//     justifyContent: 'center',
//     paddingTop: 80,
//     paddingLeft: 20,
//     paddingRight: 20
//   }
// })

// export default App;

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }
import { firebase } from './src/firebase/config'

// Suppress a warning for a known issue with React Native + Firebase
// See https://github.com/firebase/firebase-js-sdk/issues/97
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setLoading(false)
      setUser(user)
    });
  }, []);

  if (loading) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} user={user} />}
          </Stack.Screen>
        ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}