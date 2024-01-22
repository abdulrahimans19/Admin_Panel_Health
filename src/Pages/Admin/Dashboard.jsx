import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleartopNav } from "../../Redux/Features/NavbarSlice";
import LineChart from "../../components/Linechart";
import PriceDisplayCard from "../../components/PriceDisplayCard";
import AppoimentTable from "../../components/Tables/AppointmentTable";
import PriceDisplayCard2 from "../../components/PriceDisplayCard2";
import PriceDisplayCard3 from "../../components/PriceDisplayCard3";


export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleartopNav());
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold p-2 ">DashBoard</h1>
      <div class="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-3 gap-4 mb-4">
        <div class="grid grid-cols-1 md:grid-cols-3   gap-4 mb-4 lg:col-span-2">
          <PriceDisplayCard />
          <PriceDisplayCard2/>
          <PriceDisplayCard3/>
          

          <div className=" md:col-span-3">
            <LineChart />
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
                  <p className="font-semibold flex ">see all <span className="pt-1"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.3335 8.00016H12.6668M12.6668 8.00016L8.00016 3.3335M12.6668 8.00016L8.00016 12.6668" stroke="#8E95A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span></p>
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
