import React from "react";
import noDataImage from "../assets/images/no_data.png";

function NoDataImage({ text }) {
  return (
    <div>
      <div className="">
        <div className="flex justify-center">
          <div>
            <h1 className="font-medium text-2xl text-center mt-4">{text}</h1>
            <img
              className=""
              height={50} // Adjust the height as per your preference
              style={{ width: "280px", height: "455px" }} // Allow the image to shrink to fit its container
              src={noDataImage}
              alt="loading"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoDataImage;
