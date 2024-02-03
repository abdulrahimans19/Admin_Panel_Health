import React, { useCallback, useState } from "react";
import EditMessageModal from "./EditMessageModal";
import { useDropzone } from "react-dropzone";
import {
  UploadImageUrl,
  sendNotification,
  uploadToAws,
} from "../../../API/ApiCall";

function NotificationPage() {
  const [editMessageModal, setEditMessageModal] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [image, setImage] = useState("");
  const [notificationData, setNotificationData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });
  const [isImageUploading, setIsImageUploading] = useState(false); // New state to track image uploading status

  const onDrop = useCallback((acceptedFiles) => {
    console.log("poiu");
    setFileToUpload(acceptedFiles[0]);
    setShowImage(true);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });
  const uploadImageAndCreateTest = async () => {
    setIsImageUploading(true); // Indicate that image upload is in progress

    if (fileToUpload == null) {
      confirmSendNotification();
      return;

    }
    try {
      const { data } = await UploadImageUrl();
      await uploadToAws(data.presignedUrl, fileToUpload);
      // Update notificationData with the publicUrl after successful upload
      setNotificationData((prev) => ({ ...prev, imageUrl: data.publicUrl }));
      console.log("Image uploaded to AWS:", data.publicUrl);
      setIsImageUploading(false); // Reset the uploading flag
      confirmSendNotification(data.publicUrl); // Proceed to send the notification
    } catch (error) {
      console.error("Failed to upload image:", error);
      setIsImageUploading(false); // Reset the uploading flag
      // alert("Failed to upload image. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotificationData((prevState) => ({ ...prevState, [name]: value }));
  };
const [error, seterror] = useState()
  const handleSendClick = () => {
    if (!notificationData.title.trim() || !notificationData.message.trim()) {
      // alert("Please fill in all required fields.");
      seterror("add message")
      return;
    }
    seterror("")

    setEditMessageModal(true);
  };

  const confirmSendNotification = (imageUrl) => {
    // uploadImageAndCreateTest();
    const finalNotificationData = {
      ...notificationData,
      imageUrl: imageUrl, // Ensure imageUrl is updated before sending
    };
    console.log("Notification data to send:", finalNotificationData);

    sendNotification(finalNotificationData).then((data) => {
      console.log(data);
      // alert('Notification sent successfully');
      // Reset component state after sending
      setImage("");
      setNotificationData({ title: "", message: "", imageUrl: "" });
      setEditMessageModal(false);

      setShowImage(false);
      console.log(notificationData);
      setFileToUpload(null);
    });
  };

  return (
    <div className="">
      {editMessageModal && (
        <EditMessageModal
          callback={uploadImageAndCreateTest}
          setEditMessageModal={setEditMessageModal}
        />
      )}
      <div className="">
        <h1 className="text-xl font-bold font-medium">
          Send Push Notifications
        </h1>
      </div>
      <div class="flex flex-col items-center md:flex-row md:justify-between">
        <div class="w-full md:w-1/2 md:pl-4 xl:pl-10 pr-4">
          <div
            {...getRootProps() }
            onClick={e=>e.stopPropagation}
            class="w-full md:w-fit p-10 bg-slate-200 rounded-md"
          >
            <input {...getInputProps()} />

            <label
              for="file_input"
              class=" mb-2 text-sm font-medium text-gray-900 flex items-center"
            >
              {" "}
              {!showImage ? (
                <div className="flex ">
                  <h1 className="">Upload image</h1>
                  <div className="p-1">
                    <svg
                      class="mr-2 w-4 h-4 text-gray-500"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 7l5-5 5 5"></path>
                      <path d="M12 2v13"></path>
                      <path d="M5 11l7 7 7-7"></path>
                      <path d="M12 19V6"></path>
                    </svg>
                  </div>
                </div>
              ) : (
                <div
                  sx={{
                    overflow: "hidden",
                    objectFit: "cover",
                    marginTop: 2,
                  }}
                >
                  <img
                    height={100}
                    src={image}
                    alt="Your Image"
                    sx={{ width: "100%" }}
                  />
                </div>
              )}
            </label>

            {/* <input type="file" id="file_input" class="hidden" /> */}
          </div>
        </div>
        <div class="w-full md:w-4/5">
          <div>
            <div class="w-full md:w-1/2">
              <div class="mb-6">
                <label
                  for="title"
                  class="block mb-2 text-sm font-medium text-gray-900 mt-4"
                >
                  Enter Push Notification to send to all users
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={notificationData.title}
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Message Title"
                  required
                />
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 mt-4"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  onChange={handleChange}
                  value={notificationData.message}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Type message to send"
                  required
                ></textarea>
     {error && (
                            <p className="text-red-500 text-xs">
                              {error}
                            </p>
                          )}
                <div class="flex space-x-2 pt-4">
                  {/* <button class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Cancel
            </button> */}


                  <button
                    onClick={handleSendClick}
                    class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
