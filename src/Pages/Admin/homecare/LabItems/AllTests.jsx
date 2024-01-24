import React, { useEffect, useState } from "react";
import TestCard from "./lab_components/TestCard";
import { getAllLabTestsApi } from "../../../../API/ApiCall";
import { homecare } from "../../../../Redux/Features/NavbarSlice";

function AllTests() {
  const [labTest, setLabtest] = useState([]);

  useEffect(() => {
    getAllTestsCards();
  }, []);

  const getAllTestsCards = () => {
    getAllLabTestsApi().then((data) => {
      setLabtest(data.data.data.tests);
    });
  };
  return (
    <div>
      <div className="pt-3">All Tests</div>
      <div className="text-xs">{labTest.length != 0 ? labTest.length : 0} items</div>
      <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mb-4 p-4">
        {labTest[0] &&
          labTest.map((data) => {
            return <TestCard data={data} />;
          })}
      </div>
    </div>
  );
}

export default AllTests;
