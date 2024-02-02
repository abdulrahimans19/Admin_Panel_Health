import React, { useEffect, useState } from "react";
import TestCard from "./lab_components/TestCard";
import {
  getRecommendedTestApi,
  getRecommendedTestsbyCategoryApi,
} from "../../../../API/ApiCall";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import AddLabItemsButton from "../AddLabItemsButton";
import LabModal from "./lab_components/LabModal";

function Recommended() {
  const [recommendedTest, setRecommendedTest] = useState([]);
  const [totalPagecount, setTotalPagecount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLabModal1, setShowLabModal1] = useState(false);

  const handlePageChange = (selectedPage) => {
    // Handle page change logic here, e.g., fetching data for the new page
    setCurrentPage(selectedPage.selected + 1);
  };
  const { testFilter } = useSelector((state) => {
    return state.admin;
  });
  const toggleMenu = () => {
    console.log("togggl", showLabModal1);
    setShowLabModal1(!showLabModal1);
  };
  useEffect(() => {
    if (testFilter) {
      getRecomendedTestsByCat(testFilter);
    }
  }, [testFilter]);
  const getRecomendedTestsByCat = (category) => {
    getRecommendedTestsbyCategoryApi(category, currentPage)
      .then((data) => {
        console.log("data is", data.data.data.tests);
        const totalPages = Math.ceil(data.data.data.total_document / 10);
        setTotalPagecount(totalPages);
        setRecommendedTest(data.data.data.tests);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllRecomendedTests = () => {
    getRecommendedTestApi(currentPage)
      .then((data) => {
        console.log("data is", data.data.data.tests);
        const totalPages = Math.ceil(data.data.data.total_document / 10);
        setTotalPagecount(totalPages);
        setRecommendedTest(data.data.data.tests);
        console.log("recomended", recommendedTest);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!testFilter) {
      getAllRecomendedTests();
    }
  }, [currentPage]);
  return (
    <div>
      {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->  */}
      <div className="pt-3">
        <h1>Recommended</h1>
        <div className="text-xs">
          {recommendedTest.length != 0 ? recommendedTest.length : 0} recommended
          items
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            console.log("modal opened");
            setShowLabModal1(true);
          }}
        >
          <AddLabItemsButton
            text={"Add lab items "}
            //  callback={toggleMenu}
          />
        </button>
      </div>

      <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mb-4 p-4">
        {recommendedTest[0] &&
          recommendedTest.map((data) => {
            return (
              <TestCard
                data={data}
                getData={getAllRecomendedTests}
                getAllTests={getAllRecomendedTests}
                getLabTestsbyCategory={getRecomendedTestsByCat}
                type={"recommended"}
              />
            );
          })}
      </div>

      {showLabModal1 && (
        <LabModal
          getAllTests={getAllRecomendedTests}
          callback={toggleMenu}
          setShowModal={setShowLabModal1}
        />
      )}
      <ReactPaginate
        pageCount={totalPagecount} // Replace with the total number of pages
        pageRangeDisplayed={3} // Number of pages to display in the pagination bar
        marginPagesDisplayed={1} // Number of pages to display for margin pages
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        forcePage={currentPage - 1}
      />
    </div>
  );
}

export default Recommended;
