import React from "react";

export default function AddItemButton({ text, img }) {
  return (
    <div>
      <button className="rounded bg-black text-white p-3 items-center flex bg-no-repeat">
        <img src={img} className="w-5 h-5 mr-2 object-contain" alt="" />
        <div className="sm:block">{text}</div>
      </button>
    </div>
  );
}
