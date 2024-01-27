import React, { useEffect, useState } from "react";
import WithdrawalTable from "../../../components/Tables/telemedicin/WithdrawalTable";
import {
  AprovingwithdrawalRequest,
  GetDoctorWithdrawalRequsts,
} from "../../../API/ApiCall";

function WithdrawalPannel() {
  const [data, SetData] = useState([]);
  const [document, SetDocument] = useState(0);

  useEffect(() => {
    getWithdrawalRequsts();
  }, []);

  function getWithdrawalRequsts() {
    GetDoctorWithdrawalRequsts().then((data) => {
      SetData(data.data.data.withdrawals);
      SetDocument(data.data.data?.total_document);
    });
  }
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  // console.log(data);
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <WithdrawalTable
            availabe={"Requested"}
            btText={"Accept "}
            data={data}
            callBack={AprovingwithdrawalRequest}
            document={document}
          />
        );
      case 2:
        return (
          <WithdrawalTable
            callBack={""}
            data={""}
            availabe={"Request Approved"}
            btText={"Approved"}
            document={"1"}
          />
        );
    }
  };
  return (
    <div className="container mt-5">
      <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <ul className="flex ">
          <li className="me-2">
            <a
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${
                activeTab === 1
                  ? "text-black border-b-2 border-b-black"
                  : "text-gray-500"
              }`}
              onClick={() => {
                handleTabClick(1);
              }}
            >
              Requests
            </a>
          </li>
          <li className="me-2">
            <a
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${
                activeTab === 2
                  ? "text-black border-b-2 border-b-black"
                  : "text-gray-500"
              }`}
              onClick={() => {
                handleTabClick(2);
              }}
            >
              Approved
            </a>
          </li>
        </ul>
      </div>
      {renderTabContent()}
    </div>
  );
}
export default WithdrawalPannel;
