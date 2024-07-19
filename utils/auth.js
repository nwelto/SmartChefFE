import firebase from 'firebase/app';
import 'firebase/auth';

const endpoint = 'https://localhost:7214';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/checkUser/${uid}`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => {
      if (resp.ok) {
        resolve(resp.json());
      } else {
        resolve({});
      }
    })
    .catch(reject);
});

const registerUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/registerUser`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
};
