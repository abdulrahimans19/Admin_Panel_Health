import React, { useState } from "react";

function FilterDropDown({ text }, values, callback, isappoiment) {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    callback(selectedCategory);
  };
  return (
    <div>
      <div>
        <select
          id="category"
          class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2"
        >
          <option value="">{text}</option>
          {
            // values.map((data)=>{
            // <option value="cough_blood">Cough Blood</option>
            // })
          }
        </select>

        {/* <!-- Dropdown menu --> */}
      </div>
    </div>
  );
}

export default FilterDropDown;
