import React, { useEffect, useState } from "react";
import TestCard from "./lab_components/TestCard";
import {
  getAllLabTestsApi,
  getLabTestsbyCategoryApi,
} from "../../../../API/ApiCall";
import { homecare } from "../../../../Redux/Features/NavbarSlice";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import LabModal from "./lab_components/LabModal";
import AddLabItemsButton from "../AddLabItemsButton";
import NoDataImage from "../../../../components/NoDataImage";

function AllTests() {
  const [showList, setShowList] = useState(false);
  const [showLabModal1, setShowLabModal1] = useState(false);
  const [labTest, setLabtest] = useState([]);
  const [totalPagecount, setTotalPagecount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleMenu = () => {
    console.log("togggl", showLabModal1);
    setShowLabModal1(!showLabModal1);
  };

  const handleOuterClickTestCard = () => {
    setShowList(false);
  };
  const handlePageChange = (selectedPage) => {
    // Handle page change logic here, e.g., fetching data for the new page
    setCurrentPage(selectedPage.selected + 1);
    console.log("pageib", currentPage);
  };
  const { testFilter } = useSelector((state) => {
    return state.admin;
  });
  useEffect(() => {
    if (testFilter) {
      getLabTestsbyCategory(testFilter);
    }
  }, [testFilter]);

  useEffect(() => {
    if (!testFilter) {
      getAllTests();
    }
  }, [currentPage]);

  const getLabTestsbyCategory = (category) => {
    getLabTestsbyCategoryApi(category).then((data) => {
      console.log("cat file", data);
      const totalPages = Math.ceil(data.data.data.total_document / 10);
      setTotalPagecount(totalPages);
      setLabtest(data.data.data.tests);
    })  .catch((err) => {
      console.log(err);
    });
  };

  const getAllTests = () => {
    getAllLabTestsApi(currentPage).then((data) => {
      console.log("all tests", data);
      const totalPages = Math.ceil(data.data.data.total_document / 10);
      setTotalPagecount(totalPages);
      setLabtest(data.data.data.tests);
      console.log("laddada",labTest);
    })  .catch((err) => {
      console.log(err);
    });
  };

  const callback = (data) => {
    console.log("agop;", data);
  };
  return (
    <div>
      <div className="pt-3">All Tests</div>
      <div className="text-xs">
        {labTest.length != 0 ? labTest.length : 0} items
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mb-4 p-4">

      {labTest[0] ? (

    

        labTest.map((data) => {
          return(


            <TestCard
              data={data}
              getData={getAllTests}
              getLabTestsbyCategory={getLabTestsbyCategory}
              getAllTests={getAllTests}
              type={""}
            />
         
          )
          
        
           
            
        })
      ) : (
        <></>
      )}
      </div>;
{labTest[0] ?<></>:<div className=" flex justify-center">
          <NoDataImage text={"Tests Are Not Added"} />
        </div>}
      {labTest[0] ? (
        <ReactPaginate
          pageCount={totalPagecount} // Replace with the total number of pages
          pageRangeDisplayed={3} // Number of pages to display in the pagination bar
          marginPagesDisplayed={1} // Number of pages to display for margin pages
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          forcePage={currentPage - 1}
        />
      ) : null}
      {showLabModal1 && (
        <LabModal
          getAllTests={getAllTests}
          callback={toggleMenu}
          setShowModal={setShowLabModal1}
        />
      )}
    </div>
  );
}

export default AllTests;
