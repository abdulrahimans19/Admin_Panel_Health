// ConfirmationModal.js
import React from "react";

const ConfirmationModal = ({ onClose, onConfirm, text }) => {
  return (
    <div
      id="confirmationModal"
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div class="bg-white  border-2 w-80 rounded-lg p-4 shadow-lg">
        <div class="text-center">
          <h2 class="text-2xl font-semibold mb-4">Confirmation</h2>
          <p class="text-gray-600 mb-6">{text}</p>
        </div>
        <div class="flex justify-center space-x-4">
          <button
            id="confirmButton"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={() => {
              onConfirm();
              onClose(false);
            }}
          >
            Confirm
          </button>
          <button
            id="cancelButton"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
