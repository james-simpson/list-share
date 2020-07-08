/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';

import { TodoList } from './components'

const App: () => React$Node = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      {/* keyboardShouldPersistTaps='always' allows moving focus from
            one TextInput to another within a ScrollView in one touch */}
      <ScrollView keyboardShouldPersistTaps='always'>
        <TodoList />
      </ScrollView>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f781',
    justifyContent: 'center',
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default App;
