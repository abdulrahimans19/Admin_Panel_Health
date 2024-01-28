import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { foodNavdata, pharmacyNav } from "../../../Redux/Features/NavbarSlice";
import ReactPaginate from "react-paginate";
import "../../../assets/pagination.css";
import {
  getFoodProductApi,
  getFoodProducts,
  getFoodReview,
  getPharmaCategory,
  getPharmaProductApi,
} from "../../../API/ApiCall";
import CatCard from "../../../components/Cards/CatCard";
import ReviewCard from "../../../components/Cards/ReviewCard";

export default function PharmaReview() {
  const [totalPagecount, setTotalPagecount] = useState(0);
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState([]);
  const [viewReview, setViewReview] = useState(false);
  const [reviewdata, setReviewdata] = useState("");
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const GetPharmacyCat = () => {
    getFoodProductApi(currentPage).then(({ data }) => {
      const totalPages = Math.ceil(data.data.total_document / 10);
      setTotalPagecount(totalPages);
      setCategoryData(data.data.products);
    });
  };




  const editCat = () => {};

  const viewCatInfo = (data) => {
    console.log(data);
    setReviewdata(data);
    collectData(data);

    setViewReview(!viewReview);
  };

  const collectData = (data) => {
    getFoodReview(data._id).then(({ data }) => {
      console.log(data);
      setReviews(data.reviews);
    });
  };

  useEffect(() => {
    GetPharmacyCat();
    dispatch(foodNavdata());
  }, [currentPage]);

  const formatDate = (originalDateString) => {
    const originalDate = new Date(originalDateString);
    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1; // Months are zero-indexed
    const year = originalDate.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
  };
const handlePageChange=(selectedPage)=>
{
console.log(selectedPage);
setCurrentPage(selectedPage.selected+1);
}
  return (
    <>
      <div>
        <div className="flex gap-3 "></div>

        <div className="flex justify-between">
          <div>
            <p className=" pl-3 text-gray-600 font-semibold">Review</p>
          </div>
          <div>
            {/* <ComunButton text={"Add new categories"} callback={addcategory} /> */}
            <div className=""></div>

            <div className="flex items-center px-2.5 mt-4 py-0.5 text-base font-semibold text-green-500 text-center"></div>
          </div>
        </div>
        <div>
          {viewReview ? (
            <div className="p-6">
              <button
                onClick={() => {
                  setViewReview(!viewReview);
                }}
                type="button"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Back
              </button>

              <div className="flex">
                {/* Image on the left */}
                <div className="w-1/5">
                  <img
                    src={reviewdata.image}
                    alt="Image"
                    className="w-full h-auto"
                  />
                </div>

                {/* Details on the right */}
                <div className="w-4/5 p-8">
                  <h2 className="text-3xl font-bold mb-4">{reviewdata.name}</h2>
                  <p className="text-gray-700">
                    <div>
                      <span className="text-yellow-500 text-3xl ">
                        {"\u2605".repeat(1)}
                      </span>
                      <span className="text-xl">
                        {reviewdata.averageRating}
                      </span>
                    </div>
                    <p className="text-xl text-gray-400 font-semibold">
                      {reviews.length} people reviewed thisproduct
                    </p>
                  </p>

                  <div className="mt-7 mb-4" key="dthd">
                    {/* Your review content */}

                    {reviews?.map((data) => {
                      return (
                        <div className="w-4/5 ml-4">
                          <div className="flex justify-between">
                            <div className="flex gap-1">
                              <div className="">
                                <img
                                  src="https://cdn.britannica.com/50/123550-050-885369B3/Prozac-pills.jpg"
                                  alt="User"
                                  className="rounded-full w-12 h-12"
                                />
                              </div>
                              <div>
                                <h4 className="font-bold">
                                  {data.profile_id.first_name}
                                </h4>
                              </div>
                            </div>

                            <div>
                              <span className="text-yellow-500 text-3xl">
                                {"\u2605".repeat(data?.rating)}
                              </span>
                              <p className="text-gray-400 font-semibold">
                                {formatDate(data.created_at)}
                                {/* Assuming `created_at` is the date property */}
                              </p>
                            </div>
                          </div>

                          <div className="p-4">
                            <p>{data?.comment}</p>
                          </div>
                          <div className="flex items-center mt-2"></div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add more details as needed */}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
              {categoryData[0] &&
                categoryData.map((data) => {
                  return (
                    <ReviewCard
                      data={data}
                      callback={editCat}
                      viewCatInfo={viewCatInfo}
                    />
                  );
                })}
            </div>
          )}
        </div>
        {!viewReview&&   <ReactPaginate
        pageCount={totalPagecount} // Replace with the total number of pages
        pageRangeDisplayed={3} // Number of pages to display in the pagination bar
        marginPagesDisplayed={1} // Number of pages to display for margin pages
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
       forcePage={currentPage-1}
      />}
     
      </div>
    </>
  );
}
