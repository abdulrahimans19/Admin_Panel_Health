import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { foodNavdata } from "../../../Redux/Features/NavbarSlice";
import { getFoodReview } from "../../../API/ApiCall";
export default function FoodReview() {
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const foodId = "657ff073abe69185118cd5b7"; // Replace with your foodId
        const page = 1; // Replace with the desired page
        const response = await getFoodReview(foodId, page);

        if (
          response.status &&
          response.data &&
          Array.isArray(response.data.reviews)
        ) {
          setReviews(response.data.reviews);
        } else {
          console.error("Invalid response format:", response);
          // Handle the case where the response format is not as expected
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Handle errors if needed
      }
    };

    dispatch(foodNavdata());
    fetchReviews();
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-center">
        <form className="flex items-baseline justify-center">
          {/* Your search form */}
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 placeholder-gray-400"
              placeholder="Search Mockups, Logos, Design Templates..."
              required
            />
          </div>

          <div className="flex items-center px-2.5 mt-4 py-0.5 text-base font-semibold text-green-500 text-center">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option disabled value="">
                Filter By Category
              </option>
              <option value="full">Today</option>
              <option value="Fever">Yesterday</option>
            </select>
          </div>
        </form>
      </div>

      <div className="p-5">
        {reviews.map((review) => (
          <div className="flex mb-4" key={review._id}>
            {/* Your review content */}
            <div className="">
              <img
                src="https://png.pngtree.com/png-clipart/20210309/original/pngtree-medicine-bottle-with-pink-pills-clipart-png-image_5899275.jpg"
                alt="User"
                className="  w-28"
              />
            </div>
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
                    <h4 className="font-bold">{review.profile_id.username}</h4>
                    <p className="text-gray-400 font-semibold">
                      {review.profile_id.email}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-yellow-500 text-3xl">
                    {"\u2605".repeat(review.rating)}
                  </span>
                  <p className="text-gray-400 font-semibold">
                    {review.created_at}{" "}
                    {/* Assuming `created_at` is the date property */}
                  </p>
                </div>
              </div>

              <div className="p-4">
                <p>{review.comment}</p>
              </div>
              <div className="flex items-center mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
