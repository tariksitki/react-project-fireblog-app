

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_ApiKey,
//   authDomain: process.env.REACT_APP_FIREBASE_authDomain,
//   databaseURL: process.env.REACT_APP_FIREBASE_dataBaseURL,
//   projectId: process.env.REACT_APP_FIREBASE_projectId,
//   storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
//   appId: process.env.REACT_APP_FIREBASE_appId
// };

const firebaseConfig = {
  apiKey: "AIzaSyDzAYm6zzkdm9mOYCunOZtpcWxVcnKnW4s",
  authDomain: "react-fireblog-app-dee2b.firebaseapp.com",
  databaseURL: "https://react-fireblog-app-dee2b-default-rtdb.firebaseio.com",
  projectId: "react-fireblog-app-dee2b",
  storageBucket: "react-fireblog-app-dee2b.appspot.com",
  messagingSenderId: "35153343853",
  appId: "1:35153343853:web:b15ece2a032ea2de94d664"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;
export const auth = getAuth();


    // signUp:

export const signUp = async ({email, password, country}, displayName, navigate) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password, country);
    navigate("/");
    console.log(country);

    await updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL : country
      // update isleminde phoneNumber calismiyor.
    });

    // try icinde islem basarili ise navigate kullanacagiz navigate props gelecek
  } catch (error) {
    console.log(error);
  }
};



///////////  sign in:

export const signIn = async ({email, password}, navigate) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};




/////// signout:
// signout islemini navbar da logout butonuna ekliyoruz
export const logOut = async (navigate) => {
  try {
    signOut(auth);
    alert("Logout Succesfully");
    // navigate("/")
  } catch (error) {
    alert(error);
  }
};




/////////////  user Observer:

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser)
      } else {
          setCurrentUser(false)
      }
    });
};







/////////////   sign in with Google:

export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    // console.log(result);
    navigate("/");
  }).catch((error) => {
    console.log(error);
  });
};