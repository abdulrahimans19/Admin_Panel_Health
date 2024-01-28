import React, { useEffect, useState } from "react";
import TestCard from "./lab_components/TestCard";
import { getRecommendedTestApi, getRecommendedTestsbyCategoryApi } from "../../../../API/ApiCall";
import { useSelector } from "react-redux";

function Recommended() {
  const [recommendedTest,setRecommendedTest]= useState([])
  const {testFilter}=useSelector((state)=>{
    return state.admin
  })
  useEffect(()=>{
    if(testFilter){
      getRecomendedTestsByCat(testFilter)
    }
    },[testFilter])
  const getRecomendedTestsByCat=(category)=>{
    getRecommendedTestsbyCategoryApi(category).then((data)=>{
      console.log("data is",data.data.data.tests);
      setRecommendedTest(data.data.data.tests)
    })
  }
  const getAllRecomendedTests=()=>{
    getRecommendedTestApi().then((data)=>{
      console.log("data is",data.data.data.tests);
      setRecommendedTest(data.data.data.tests)
    })
  }
  useEffect(() => {
    getAllRecomendedTests();
}, []);
  return (
    <div>
      {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->  */}
      <div className="pt-3">
        <h1>Recommended</h1>
        <div className="text-xs">{recommendedTest.length!=0 ? recommendedTest.length : 0} recommended items</div>
      </div>

      <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mb-4 p-4">
        {recommendedTest[0] && 
        recommendedTest.map((data)=>{
          return(
            <TestCard data={data} />
          )
        })
        }
        
      </div>
    </div>
  );
}

export default Recommended;
