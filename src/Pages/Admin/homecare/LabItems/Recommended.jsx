import React, { useEffect, useState } from "react";
import TestCard from "./lab_components/TestCard";
import { getRecommendedTestApi } from "../../../../API/ApiCall";

function Recommended() {
  const [recommendedTest,setRecommendedTest]= useState([])

  useEffect(()=>{
    getAllRecomendedTests()
    },[])
  const getAllRecomendedTests=()=>{
    getRecommendedTestApi().then((data)=>{
      console.log("data is",data.data.data.tests);
      setRecommendedTest(data.data.data.tests)
    })
  }
  return (
    <div>
      {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->  */}
      <div className="pt-3">
        <h1>Recommended</h1>
        <div className="text-xs">{recommendedTest.length!=0 ? recommendedTest.length : 0} recommended items</div>
      </div>

      <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mb-4 p-4">
<<<<<<< HEAD
        {recommendedTest[0] && 
        recommendedTest.map((data)=>{
          return(
            <TestCard data={data} />
          )
        })
        }
=======
        <TestCard />
        <TestCard />
        <TestCard />
>>>>>>> 3e2a98906301f4606bad59b80a2500e6c17ca225
      </div>
    </div>
  );
}

export default Recommended;
