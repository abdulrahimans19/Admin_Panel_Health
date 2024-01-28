import React, { useEffect, useState } from "react";
import TestCard from "./lab_components/TestCard";
import { getAllLabTestsApi, getLabTestsbyCategoryApi } from "../../../../API/ApiCall";
import { homecare } from "../../../../Redux/Features/NavbarSlice";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

function AllTests() {
  const [labTest, setLabtest] = useState([]);
  const [totalPagecount, setTotalPagecount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    // Handle page change logic here, e.g., fetching data for the new page
    setCurrentPage(selectedPage.selected);
  }
  const {testFilter}=useSelector((state)=>{
    return state.admin
  })
  useEffect(()=>{
    if(testFilter){
    getLabTestsbyCategory(testFilter)
    }
  },[testFilter])
  
  useEffect(() => {
      getAllTests();
  }, []);

  const getLabTestsbyCategory = (category) => {
    getLabTestsbyCategoryApi(category).then((data) => {
      const totalPages = Math.ceil(data.data.data.total_document / 10);
      setTotalPagecount(totalPages)
      setLabtest(data.data.data.tests);
    });
  };


  const getAllTests = () => {
    getAllLabTestsApi().then((data) => {
      const totalPages = Math.ceil(data.data.data.total_document / 10);
      setTotalPagecount(totalPages)
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

      <ReactPaginate
        pageCount={totalPagecount}  // Replace with the total number of pages
        pageRangeDisplayed={3}  // Number of pages to display in the pagination bar
        marginPagesDisplayed={1}  // Number of pages to display for margin pages
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default AllTests;
