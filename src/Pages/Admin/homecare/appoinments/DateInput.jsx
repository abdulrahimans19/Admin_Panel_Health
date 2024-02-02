import React from "react";
import DatePicker from "react-datepicker";

function DateInput({ label, selectedDate, onChange }) {
  return (
    <div>
      <div className="text-gray-500 text-base font-normal leading-tight tracking-tight relative">
        <div className="text-slate-400 text-base font-normal leading-tight tracking-tight mt-3 relative">
          <DatePicker
            placeholderText={label}
            selected={selectedDate}
            className="border text-gray-900 w-[118px] h-12 px-1 py-2.5 justify-start items-center gap-2 flex rounded-lg"
            onChange={onChange}
          />
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute right-1 top-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default DateInput;
