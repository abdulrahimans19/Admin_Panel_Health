import React, { useEffect, useState } from "react";
import TestCard from "./lab_components/TestCard";
import {
  getDisbledTestApi,
  getDisbledTestByCatApi,
} from "../../../../API/ApiCall";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

function Disabled() {
  const [disbledTest, setDisabledTest] = useState([]);
  const [totalPagecount, setTotalPagecount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (selectedPage) => {
    // Handle page change logic here, e.g., fetching data for the new page
    setCurrentPage(selectedPage.selected + 1);
  };
  const { testFilter } = useSelector((state) => {
    return state.admin;
  });
  useEffect(() => {
    if (testFilter) {
      getDisabledTestByCat(testFilter);
    }
  }, [testFilter]);

  useEffect(() => {
    if (!testFilter) {
      getDisabledTestCards();
    }
  }, [currentPage]);

  const getDisabledTestCards = () => {
    getDisbledTestApi(currentPage)
      .then((data) => {
        const totalPages = Math.ceil(data.data.data.total_document / 10);
        console.log("totsl pagesdssdg", totalPages);
        setTotalPagecount(totalPages);
        console.log(data.data.data.tests);
        setDisabledTest(data.data.data.tests);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDisabledTestByCat = (category) => {
    getDisbledTestByCatApi(category)
      .then((data) => {
        const totalPages = Math.ceil(data.data.data.total_document / 10);
        setTotalPagecount(totalPages);
        setDisabledTest(data.data.data.tests);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="pt-3">
        Disabled
        <div className="text-xs">
          {disbledTest.length != 0 ? disbledTest.length : 0} items disabled
        </div>
      </div>
      <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 mb-4 p-4">
        {disbledTest[0] &&
          disbledTest.map((data) => {
            return (
              <TestCard
                data={data}
                getAllTests={getDisabledTestCards}
                getLabTestsbyCategory={getDisabledTestByCat}
                type={"disabled"}
              />
            );
          })}
      </div>
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

export default Disabled;
