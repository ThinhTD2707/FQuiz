import { useState } from "react";
import { signInWithPopup, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
// import { auth, db, provider } from "./firebase";
import { auth, db, provider } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const [emailSignUp, setEmailSignUp] = useState("")
     const [passwordSignUp, setPasswordSignUp] = useState("")

     // * Signin with email and password States
     const [emailSignIn, setEmailSignIn] = useState("")
     const [passwordSignIn, setPasswordSignIn] = useState("")

     // * Signup function with email and password
     const Signup = async () => {
          try {
               const email = emailSignUp;
               const password = passwordSignUp;

               const userCredential = await createUserWithEmailAndPassword(auth, email, password)
               const user = userCredential.user;

               const usersCollectionRef = doc(db, "users", user.uid);
               await setDoc(usersCollectionRef, { email, password })

               setEmailSignUp("");
               setPasswordSignUp("");
          } catch (error) {
               console.log("error: ", error);
          }
     }

     // * SignIn function with email and password
     const SignIn = async () => {
          try {
               const email = emailSignIn;
               const password = passwordSignIn;

               const userCredential = await signInWithEmailAndPassword(auth, email, password);
               const user = userCredential.user;

               setEmailSignIn("")
               setPasswordSignIn("")
          } catch (error) {
               console.log("error: ", error);
          }
     }

     // * SignIn with Google
     const signInWithGoogle = async () => {
          try {
               const userCredential = await signInWithPopup(auth, provider)
               const user = userCredential.user
               const name = user.displayName;
               const email = user.email;
               const profilePic = user.photoURL;

               const usersCollectionRef = doc(db, "users", user.uid);
               await setDoc(usersCollectionRef, { email, googleAuth: true });

          } catch (error) {
               console.log("error: ", error);
          }
     }

     // * Logout
     const logout = async () => {
          try {
               await signOut(auth);
               alert("logout")
          } catch (error) {
               console.log("error: ", error);
          }
     }