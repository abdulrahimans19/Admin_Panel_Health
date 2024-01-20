import React from "react";
import buttonImage from "../../assets/images/element-plus.png";

export default function ComunButton({ text, callback }) {
  return (
    <div>
      <button
        className="rounded bg-black text-white p-3 items-center flex bg-no-repeat"
        onClick={callback}
      >
        <img src={buttonImage} className="w-5 h-5 mr-2 object-contain" alt="" />
        <div className="sm:block">{text}</div>
      </button>
    </div>
  );
}
