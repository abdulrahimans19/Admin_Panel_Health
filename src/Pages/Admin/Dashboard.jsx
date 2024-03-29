import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleartopNav } from "../../Redux/Features/NavbarSlice";
import LineChart from "../../components/Linechart";
import PriceDisplayCard from "../../components/PriceDisplayCard";
import AppoimentTable from "../../components/Tables/AppointmentTable";
import PriceDisplayCard2 from "../../components/PriceDisplayCard2";
import PriceDisplayCard3 from "../../components/PriceDisplayCard3";
import {
  TotalAppointmentApi,
  monthlyEarningApi,
  totalDoctorApi,
} from "../../API/ApiCall";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const [foodChart, setFoodChart] = useState(true);
  const [monthlyEarning, setMonthlyEarning] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointment, setTotalAppointment] = useState(0);
  const [chartData, setChartData] = useState();
  const [earningCard, setearningCard] = useState();
  const [cardDifference, setCardDifference] = useState();
  const navigate = useNavigate();

  const monthlErnings = () => {
    if (foodChart) {
      monthlyEarningApi("FOOD")
        .then(({ data }) => {
          const currentDate = new Date();
          const currentMonth = currentDate.toLocaleString("default", {
            month: "long",
          });

          setChartData(data.data.earnings);

          setCardDifference(data.data.incomeDifference);
          setearningCard();
          setMonthlyEarning(data.data.earnings[currentMonth]);
        })
        .catch((err) => {});
    } else {
      monthlyEarningApi("PHARMA")
        .then(({ data }) => {
          setChartData(data.data.earnings);
          const currentDate = new Date();
          const currentMonth = currentDate.toLocaleString("default", {
            month: "long",
          });

          setMonthlyEarning(data.data[currentMonth]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    dispatch(cleartopNav());

    totalDoctorApi().then(({ data }) => {
      setTotalDoctors(data.data);
    });

    TotalAppointmentApi().then(({ data }) => {
      setTotalAppointment(data.data);
    });
  }, []);

  useEffect(() => {
    monthlErnings();
  }, [foodChart]);
  return (
    <div>
      <h1 className="text-2xl font-bold p-2 mt-5">DashBoard</h1>
      <div class="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-3 gap-4 mb-4">
        <div class="grid grid-cols-1 md:grid-cols-3   gap-4 mb-4 lg:col-span-2">
          <PriceDisplayCard
            data={monthlyEarning}
            cardDifference={cardDifference}
          />
          <PriceDisplayCard2 data={totalDoctors} />
          <PriceDisplayCard3 data={totalAppointment} />

          <div className=" md:col-span-3">
            {chartData && (
              <LineChart earnings={monthlyEarning} data={chartData} />
            )}
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
                  <button>
                    <a
                      onClick={() => {
                        navigate("/homecare/appoinment-details");
                      }}
                      className="font-semibold flex "
                    >
                      See all{" "}
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
                    </a>
                  </button>
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
