import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  onMessageListener,
  requestForToken,
} from "../../firebase/Firebaseconfig";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    requestForToken();
    const fetchNotification = async () => {
      try {
        const payload = await onMessageListener();
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
        });

        // Display toast notification when a new message is received
        if (payload?.notification?.title && payload?.notification?.body) {
          toast.success(
            <>
              <strong>{payload.notification.title}</strong>
              <p>{payload.notification.body}</p>
            </>,
            {
              duration: 5000, // Optional: Set the duration for which the toast will be visible
            }
          );
        }

        // You can perform additional actions based on the notification payload
        // For example, you may want to update your application state or trigger specific behavior.
      } catch (error) {
        console.log("failed: ", error);
      }
    };

    fetchNotification();
  }, []); // Run the effect only once on mount

  return (
    <>
      <Toaster />
    </>
  );
};

export default Notification;
