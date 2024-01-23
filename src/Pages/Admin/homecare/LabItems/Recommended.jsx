import React from "react";
import TestCard from "./lab_components/TestCard";

function Recommended() {
  return (
    <div>
      {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->  */}
      <div className="pt-3">
        <h1>Recommended</h1>
        <div className="text-xs">
          9 recomended items
        </div>
      </div>

      <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mb-4 p-4">
        <TestCard />
        <TestCard />
        <TestCard />
        
      </div>
    </div>
  );
}

export default Recommended;
