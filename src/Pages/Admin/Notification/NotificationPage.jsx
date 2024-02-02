import React, { useCallback, useState } from "react";
import EditMessageModal from "./EditMessageModal";
import { useDropzone } from "react-dropzone";

function NotificationPage() {
  const [editMessageModal, setEditMessageModal] = useState(false);
  const [showImage, setShowImage] = React.useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [Image, setImage] = React.useState("");

  const [editImage, seteditImage] = useState(true);
  const onDrop = useCallback((acceptedFiles) => {
    seteditImage(false);
    console.log(acceptedFiles[0]);
    setFileToUpload(acceptedFiles[0]);
    setShowImage(true);

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    console.log(reader);
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  const sendMessageHandle = () => {
    setEditMessageModal(true);
  };

  return (
    <div className="container">
      {editMessageModal && (
        <EditMessageModal setEditMessageModal={setEditMessageModal} />
      )}
      <div className="">
        <h1 className="text-xl font-bold font-medium">
          Send Push Notifications
        </h1>
      </div>
      <form onSubmit={sendMessageHandle}>
        <div class="flex flex-col items-center md:flex-row md:justify-between">
          <div class="w-full md:w-1/2 md:pl-4 xl:pl-10 pr-4">
            <div
              {...getRootProps()}
              class="w-full md:w-fit p-10 bg-slate-200 rounded-md"
            >
              <label
                for="file_input"
                class="block mb-2 text-sm font-medium text-gray-900 flex items-center"
              >
                {!showImage ? (
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
                      src={Image}
                      alt="Your Image"
                      sx={{ width: "100%" }}
                    />
                  </div>
                )}
                Upload Image
              </label>
              <input type="file" id="file_input" class="hidden" />
            </div>
          </div>
          <div class="w-full md:w-4/5">
            <div>
              <div class="w-full md:w-1/2">
                <div class="mb-6">
                  <label
                    for="title"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Enter Push Notification to send to all users
                  </label>
                  <input
                    type="text"
                    id="title"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Demo Title"
                    required
                  />
                  <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Type message to send"
                    required
                  ></textarea>

                  <div class="flex space-x-2 pt-4">
                    <button class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Cancel
                    </button>
                    <button
                      type="submit"
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
      </form>
    </div>
  );
}

export default NotificationPage;
