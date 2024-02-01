import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { updateFcmApi } from '../API/ApiCall';
import wavFile from "../assets/short-success-sound-glockenspiel-treasure-video-game-6346.mp3";



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

  console.log("requsting fcm");
    return getToken(messaging, { vapidKey:'BBntf0wtSGGY53TbLmtSnOtD0wLNipXBbzl_49LuA99HTeLV3VwMJuZ5U61gOxf30kkFBiW_GDF_gz8yUffr_ho' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('current token for client:',currentToken);
          console.log(currentToken);
          localStorage.setItem("sophwe_fcm",currentToken)
          updateFcmApi({fcm_token:currentToken}).then((data)=>
          {
            console.log(data);
          }).catch((err)=>
          {
console.log(err);
          })
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
      // const audio = new Audio(wavFile);

      // console.log("payload", payload)
      // audio.play().catch((err)=>
      // {
      //   console.log(err);
      // })
      resolve(payload);
    });
  });