// Import the functions you need from the SDKs you need from
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFt2FqfXwCVSK3o8NpiqEVURDN5KoO_uE",
    authDomain: "tradingvenkateshkoka.firebaseapp.com",
    projectId: "tradingvenkateshkoka",
    storageBucket: "tradingvenkateshkoka.appspot.com",
    // messagingSenderId: "336250528340",
    appId: "1:336250528340:web:102041b6b3375995fd03c1",
    measurementId: "G-K9XCT1N505"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
