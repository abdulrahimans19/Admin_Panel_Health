import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleartopNav } from "../../Redux/Features/NavbarSlice";
import LineChart from "../../components/Linechart";
import PriceDisplayCard from "../../components/PriceDisplayCard";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleartopNav());
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold p-4 ">DashBoard</h1>
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="grid grid-cols-3 gap-4 mb-4 col-span-2">
          <PriceDisplayCard />
          <PriceDisplayCard />
          <PriceDisplayCard />

          <div className="col-span-3">
            <LineChart />
          </div>
        </div>

        <div class="flex flex-col  shadow p-4">
  <div class="-m-1.5 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-">
      <table class="table-auto w-full mt-5 rounded  border-separate border-spacing-y-3">
  <thead class="text-left rounded-lg bg-gray-100 text-gray-500 tracking-wider">
    <tr>
      <th class="p-1">Name</th>
      <th class="p-1">Member</th>
      <th class="p-1">ID</th>
      <th class="p-1">Test Name</th>
    </tr>
  </thead>
  <tbody class="">
  
    <tr class="bg-card rounded text-black border-2 outline  ">
      <td class="p-1">60001</td>
      <td class="p-1">rfdrg</td>
      <td class="p-1">6/</td>
      <td class="p-1">Not published</td>
    </tr>
    <tr class="bg-card rounded text-black border-2 outline  ">
      <td class="p-1">60001</td>
      <td class="p-1">rfdrg</td>
      <td class="p-1">6/</td>
      <td class="p-1">Not published</td>
    </tr>
    <tr class="bg-card rounded text-black border-2 outline  ">
      <td class="p-1">60001</td>
      <td class="p-1">rfdrg</td>
      <td class="p-1">6/</td>
      <td class="p-1">Not published</td>
    </tr>
  </tbody>
</table>


      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
