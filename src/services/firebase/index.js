import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA1vSeWzqaJ0ih5Rz7e4rFHvIwFEEbTtHw",
  authDomain: "mealstogo-1454e.firebaseapp.com",
  projectId: "mealstogo-1454e",
  storageBucket: "mealstogo-1454e.appspot.com",
  messagingSenderId: "660704923412",
  appId: "1:660704923412:web:19c08c0f68f4d571e1fc01",
};

let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const auth = firebase.auth();
