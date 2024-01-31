import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDqoSOtM0rfVCUVobYaE3NMTPLecHWSG9Y",
  authDomain: "sophwe-admin.firebaseapp.com",
  projectId: "sophwe-admin",
  storageBucket: "sophwe-admin.appspot.com",
  messagingSenderId: "503207080507",
  appId: "1:503207080507:web:b6c263de7aab71360ca21e",
  measurementId: "G-83VZTPV8TN"
};
initializeApp(firebaseConfig);

const messaging = getMessaging();


export const requestForToken = async () => {
    return getToken(messaging, { vapidKey:'BBntf0wtSGGY53TbLmtSnOtD0wLNipXBbzl_49LuA99HTeLV3VwMJuZ5U61gOxf30kkFBiW_GDF_gz8yUffr_ho' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client:',currentToken);
          console.log(currentToken);
          // Perform any other neccessary action with the token
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  };

  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });