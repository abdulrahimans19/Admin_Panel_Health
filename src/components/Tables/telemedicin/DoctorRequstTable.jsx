import React from "react";

export default function DoctorRequstTable() {
  return (
    <div className="">
      <table class="table-auto w-full mt-5 rounded  ">
        {/* //tracking-wider */}
        <thead class="text-center rounded-lg  text-gray-500  text-xs">
          <tr>
            <th class="p-1">ID</th>
            <th class="p-1">Profile</th>
            <th class="p-1 text-xs">Name</th>
            <th class="p-1">Category</th>
            <th class="p-1">Email</th>
            <th class="p-1">Experience</th>
            <th class="p-1">Date Added</th>
            <th class="p-1">Status</th>
          </tr>
        </thead>
        <tbody class="text-xs text-center">
          <tr class="bg-card rounded text-black   ">
            <td class="p-1">60001</td>
            <td class="p-1">joil</td>
            <td class="p-1">joel</td>
            <td class="p-1">Hepatology</td>
            <td class="p-1">123@gmail.com</td>
            <td class="p-1">10 year</td>
            <td class="p-1">20/10/2023</td>
            <td class="p-1">
              {" "}
              <button
                style={{ backgroundColor: "#FF8888", color: "#FF0B0B" }}
                className="text-xs background-transparent p-2 pl-7 pr-7 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                type="button"
              >
                Close
              </button>
              <button
                style={{ backgroundColor: "#AAFFCC", color: "#41945D" }}
                className="text-xs p-2 pl-7 pr-7 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {}}
              >
                Save
              </button>
            </td>
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
