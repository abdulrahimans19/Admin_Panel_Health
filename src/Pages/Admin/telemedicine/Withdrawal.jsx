import React, { useEffect, useState } from "react";
import WithdrawalTable from "../../../components/Tables/telemedicin/WithdrawalTable";
import {
  AprovingwithdrawalRequest,
  GetDoctorWithdrawalRequsts,
  GetDrAprovedWithdrawalRequsts,
} from "../../../API/ApiCall";
import { useDispatch } from "react-redux";
import { telemedicine } from "../../../Redux/Features/NavbarSlice";

function WithdrawalPannel() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, SetData] = useState([]);
  const [aproveddata1, SetAprovedData1] = useState([]);
  const [document, SetDocument] = useState(0);
  const [document1, SetDocument1] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(telemedicine());
    getWithdrawalRequsts();
    GetAprovedWithdrawalRequsts();
  }, []);
  console.log(data);
  function getWithdrawalRequsts() {
    console.log("in there");
    GetDoctorWithdrawalRequsts()
      .then((data) => {
        SetData(data.data.data.withdrawals);
        SetDocument(data.data.data?.total_document);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }
  function GetAprovedWithdrawalRequsts() {
    GetDrAprovedWithdrawalRequsts()
      .then((data) => {
        console.log(data.data.data.withdrawals, " kfkl this out");
        SetAprovedData1(data.data.data.withdrawals);
        SetDocument1(data.data.data?.total_document);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        console.log(data, "1");
        return (
          <WithdrawalTable
            availabe={"Requested"}
            btText={"Accept "}
            data={data}
            callBack={AprovingwithdrawalRequest}
            getWithdrawalRequsts={getWithdrawalRequsts}
            document={document}
            setData={SetData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
      case 2:
        console.log(aproveddata1, "2");
        return (
          <WithdrawalTable
            data={aproveddata1}
            availabe={"Request Approved"}
            btText={"Approved"}
            document={document1}
            isLoading={isLoading}
            setData={SetAprovedData1}
            setIsLoading={setIsLoading}
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
                GetAprovedWithdrawalRequsts();
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
