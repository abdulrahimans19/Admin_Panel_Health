import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const MyChart = ({data,earnings}) => {
  const [foodChart, setFoodChart] = useState(true);

  const series = [
    {
      name: "Series 1",
      data: Object.values(data).map((value) => parseFloat(value.toFixed(2))),
    },
  ];

  const options = {
    chart: {
      type: "line",
      width: "100%", // Set the chart width to 100% of its container
    },
    xaxis: {
      categories: Object.keys(data), // All months
    },
    // Additional chart options
    colors: ["#4caf50"], // Line color for light background
    grid: {
      borderColor: "#f1f1f1", // Grid line color for light background
    },
  };

  const lineChartDataChange = () => {
    console.log("line chart changes");
    setFoodChart(!foodChart);
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-lg shadow p-4 md:p-6">
        <div className="flex justify-between">
          <div>
            <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">
              {earnings?.toFixed(2)}
            </h5>
            <p className="text-base font-normal text-gray-500">
          this month
            </p>
          </div>
          <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 text-center">
            {/* <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected value="US">
                monthly
              </option>
              <option value="CA">yearly</option>
            </select> */}
          </div>
        </div>
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default MyChart;
