import React, { useState } from "react";

function FilterDropDown({text},callback,isappoiment) {
  const [isOpen,setIsOpen]=useState(false)
  return (
    <div>
      <div >
      <select id="category" class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2">
      <option value="">{text}</option>
        <option value="cough_blood">Cough Blood</option>
        <option value="body_check">Body Check</option>
      </select>
    
      {/* <!-- Dropdown menu --> */}
      
      </div>
    </div>
  );
}

export default FilterDropDown;
