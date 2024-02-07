import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { updateFcmApi } from "../API/ApiCall";
import wavFile from "../assets/short-success-sound-glockenspiel-treasure-video-game-6346.mp3";
import { updateDoctorFcmApi } from "../API/DoctorApi";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = async (TokenFor) => {


  
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_ID,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client:", currentToken);
        console.log(currentToken);

        if (TokenFor == "Admin") {
          localStorage.setItem("sophwe_fcm", currentToken);
          updateFcmApi({ fcm_token: currentToken })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else  if(TokenFor == "DOCTOR") {
          console.log("this is working");
          localStorage.setItem("sophwe_fcm", currentToken);
          updateDoctorFcmApi({ fcm_token: currentToken })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }

        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("recived a bg mesahe");

      resolve(payload);
    });
  });
