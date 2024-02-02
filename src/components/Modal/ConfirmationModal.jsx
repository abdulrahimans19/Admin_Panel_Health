// ConfirmationModal.js
import React from "react";

const ConfirmationModal = ({ onClose, onConfirm, text }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
      <div className="bg-white p-6 rounded-md z-50">
        <p className="mb-4">{text}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
            onClick={() => {
              onClose(false);
            }}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              onConfirm();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
