const firebase = require('firebase');
require('firebase/firestore');

const store = require('../store/store').store;

const configData = require('./config.json').init;

const config = {
  apiKey: configData.apiKey,
  authDomain: configData.authDomain,
  databaseURL: configData.databaseURL,
  storageBucket: configData.storageBucket,
  projectId: configData.projectId,
  messagingSenderId: configData.messagingSenderId,
};

firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

const login = () => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(provider))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    db
      .collection('users')
      .doc(user.uid)
      .set(
      {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
      },
        { merge: true },
      )
      .then(() => {
        db
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              store.commit('setCurrentUser', doc.data());
            }
          });
      });
  } else {
    // No user is signed in.
  }
});

const getCurrentUser = () => firebase.auth().currentUser;

module.exports = {
  firebase,
  login,
  getCurrentUser,
  db,
};
