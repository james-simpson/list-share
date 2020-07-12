import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBzIR7S6lCe3KCKSC7BMJBoz-z2caz6m9M',
  authDomain: 'list-share-564e9.firebaseapp.com',
  // databaseURL: 'https://list-share-564e9.firebaseio.com',
  projectId: 'list-share-564e9',
  storageBucket: 'list-share-564e9.appspot.com',
  messagingSenderId: '757393836036',
  appId: '1:757393836036:android:b0bb2850a8b890aab30d51',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
