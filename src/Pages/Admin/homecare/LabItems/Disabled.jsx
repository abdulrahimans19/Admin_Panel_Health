import React, { useEffect, useState } from "react";
import TestCard from "./lab_components/TestCard";
import { getDisbledTestApi } from "../../../../API/ApiCall";

function Disabled() {
  const [disbledTest, setDisabledTest] = useState([]);

  useEffect(() => {
    getDisabledTestCards();
  },[]);

  const getDisabledTestCards = () => {
    getDisbledTestApi().then((data) => {
      console.log(data.data.data.tests);
      setDisabledTest(data.data.data.tests);
    });
  };

  return (
    <div>
      <div className="pt-3">
        Disabled
        <div className="text-xs">{disbledTest.length!=0? disbledTest.length:0 } items disabled</div>
      </div>
      <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mb-4 p-4">
        {disbledTest[0] &&
        disbledTest.map((data)=>{
          return (
            <TestCard data={data} isdisbled={true}/>
          )
        })
      }
      </div>
    </div>
  );
}

export default Disabled;
