import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { BulkUploadApi } from "../../API/ApiCall";
export default function AddBulk({ onClose, type ,FoodProduct}) {
  const [jsonFile, setJsonFile] = useState("");
  const [filetoUpload, setfileToUpload] = useState();

  const onDrop = (acceptedFiles) => {
    setfileToUpload(acceptedFiles)
    setJsonFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: ".json",
  });

  const bulkSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);
    console.log(UserData);
    console.log(jsonFile);
console.log(filetoUpload);
const wholeData={file:jsonFile}
BulkUploadApi({wholeData,type}).then((data)=>
{
    console.log(data);
    onClose(false)
    FoodProduct()
})




  };

  return (
    <div onClose={onClose} className="fixed inset-0 z-50 overflow-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Upload JSON File</h2>
          <div className="space-y-4">
            <form onSubmit={bulkSubmit}>
              {!jsonFile && (
                <div
                  {...getRootProps()}
                  className="cursor-pointer border-2 border-dashed border-gray-300 p-2 mb-2"
                >
                  <input type="file" name="file" {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the JSON file here ...</p>
                  ) : (
                    <p>
                      Drag and drop a JSON file here, or click to select one
                    </p>
                  )}
                </div>
              )}

              {jsonFile && <p className="text-gray-700">{jsonFile?.name}</p>}

              {/* {formik.errors.jsonFile && (
              <p className="text-red-600">{formik.errors.jsonFile}</p>
            )} */}

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => onClose(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
