// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-Rf7Xut4zIHoVxfOmGmbTcG7UXK8I75A",
  authDomain: "adminpannelsphew.firebaseapp.com",
  projectId: "adminpannelsphew",
  storageBucket: "adminpannelsphew.appspot.com",
  messagingSenderId: "424214984066",
  appId: "1:424214984066:web:f25e5b99411bb454770b9b",
  measurementId: "G-T5KVMGX0DE",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BDwhA7wP6zeMBrL1QPTObAtEAFc45J8eo7qGAJTRcwCUVcYoZstn_iVY4ZBNWnWO08tezc5tHDnx-wfVWRozDdY",
    });
    if (currentToken) {
      console.log("current token for client: ", currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    console.log("in requst %%%%%%%%%%%");
    onMessage(messaging, (payload) => {
      const notificationData = {
        title: payload.notification.title,
        body: payload.notification.body,
        sound: payload.notification.sound || "default", // Set the sound to "default" if not provided
      };
      resolve(notificationData);
    });
  });
