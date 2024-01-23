import React from "react";
import TestCard from "./lab_components/TestCard";

function AllTests() {
  return (
    <div>
      <div className="pt-3">
        <h1>Fullbody</h1>
      </div>
      <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mb-4 p-4">
        <TestCard />
        <TestCard />
        <TestCard />
        
      </div>
    </div>
  );
}

export default AllTests;
