import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleartopNav } from "../../Redux/Features/NavbarSlice";
import LineChart from "../../components/Linechart";
import PriceDisplayCard from "../../components/PriceDisplayCard";
import AppoimentTable from "../../components/Tables/AppointmentTable";
import PriceDisplayCard2 from "../../components/PriceDisplayCard2";
import PriceDisplayCard3 from "../../components/PriceDisplayCard3";
import { monthlyEarningApi } from "../../API/ApiCall";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [foodChart, setFoodChart] = useState(true);
  const [monthlyEarning, setMonthlyEarning] = useState(0);
  const [chartData, setChartData] = useState();
  const monthlErnings = () => {
    if (foodChart) {
      monthlyEarningApi("FOOD").then(({ data }) => {
        console.log(data.data);

        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString("default", {
          month: "long",
        });
        setChartData(data.data);

        setMonthlyEarning(data.data[currentMonth]);
      });
    } else {
      console.log("else worog");
      monthlyEarningApi("PHARMA").then(({ data }) => {
        console.log(data.data);
        setChartData(data.data);
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString("default", {
          month: "long",
        });
        console.log(data.data[currentMonth]);
        setMonthlyEarning(data.data[currentMonth]);
      });
    }
  };

  useEffect(() => {
    dispatch(cleartopNav());
  }, []);

  useEffect(() => {
    monthlErnings();
  }, [foodChart]);
  return (
    <div>
      <h1 className="text-2xl font-bold p-2 mt-5">DashBoard</h1>
      <div class="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-3 gap-4 mb-4">
        <div class="grid grid-cols-1 md:grid-cols-3   gap-4 mb-4 lg:col-span-2">
          <PriceDisplayCard data={monthlyEarning} />
          <PriceDisplayCard2 />
          <PriceDisplayCard3 />

          <div className=" md:col-span-3">
           { chartData&&<LineChart data={chartData} />}
            <div className="flex gap-3 p-3">
              <p
                onClick={() => {
                  setFoodChart(true);
                }}
                className={`${
                  foodChart && "font-bold underline"
                }  text-xl  underline-offset-8 decoration-4 cursor-pointer`}
              >
                food
              </p>
              <p
                onClick={() => {
                  setFoodChart(false);
                }}
                className={`${
                  !foodChart && "font-bold underline"
                }   cursor-pointer text-xl underline-offset-8 decoration-4`}
              >
                pharmacy
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col  shadow p-4">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="">
                <div className="flex  justify-between">
                  <p className="text-xl font-semibold">
                    Lab appointment Details
                  </p>
                  <p className="font-semibold flex ">
                    see all{" "}
                    <span className="pt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.3335 8.00016H12.6668M12.6668 8.00016L8.00016 3.3335M12.6668 8.00016L8.00016 12.6668"
                          stroke="#8E95A9"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </p>
                </div>

                <AppoimentTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
