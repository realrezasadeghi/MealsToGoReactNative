import { auth } from "../firebase";
export const loginRequest = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const registerRequest = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
