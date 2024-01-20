import React from "react";

export default function DoctorRequstTable() {
  return (
    <div>
      <table class="table-auto w-full mt-5 rounded  ">
        <thead class="text-left rounded-lg bg-gray-100 text-gray-500 tracking-wider">
          <tr>
            <th class="p-1">Name</th>
            <th class="p-1">Member</th>
            <th class="p-1">ID</th>
            <th class="p-1">Test Name</th>
          </tr>
        </thead>
        <tbody class="">
          <tr class="bg-card rounded text-black   ">
            <td class="p-1">60001</td>
            <td class="p-1">rfdrg</td>
            <td class="p-1">6/</td>
            <td class="p-1">Not published</td>
          </tr>
          <tr class="bg-card rounded text-black   ">
            <td class="p-1">60001</td>
            <td class="p-1">rfdrg</td>
            <td class="p-1">6/</td>
            <td class="p-1">Not published</td>
          </tr>
          <tr class="bg-card rounded text-black   ">
            <td class="p-1">60001</td>
            <td class="p-1">rfdrg</td>
            <td class="p-1">6/</td>
            <td class="p-1">Not published</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
