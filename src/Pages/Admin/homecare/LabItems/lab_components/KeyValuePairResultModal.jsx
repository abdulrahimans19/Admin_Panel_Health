import React from 'react'

const KeyValuePairResultModal = ({ label, value }) => (
  <div className="flex items-start gap-6">
    <div className="text-gray-400 text-base font-normal font-['Roboto Flex'] text-sm">{label}:</div>
    <div className="text-zinc-800 text-base font-normal font-['Roboto Flex'] text-sm">
      {value.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          {index < value.split('\n').length - 1 && <br />}
        </span>
      ))}
    </div>
  </div>
);

export default KeyValuePairResultModal
