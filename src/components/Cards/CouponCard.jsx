// src/components/MovieTicketCard.js
import { Card, CardBody, Typography } from "@material-tailwind/react";
import pen from "../../assets/images/writeIcon.png";
import coupongreen from "../../assets/images/coupongreen.png";

import React from "react";

const MovieTicketCard = ({ callback, data }) => {

  return (
    <Card className=" rounded-xl overflow-hidden   border-2   ">
      <CardBody>
        <div>
          <div className="flex justify-between p-1  border-b-2 border-gray-300">
            <div className="flex gap-2 align-baseline">
              <div>
                <img className="w-5 " src={coupongreen} alt="error" />
              </div>
              <div>coupon and Offers</div>
            </div>
            <div
              onClick={() => {
                callback(data);
              }}
            >
              {" "}
              <img className="w-6 cursor-pointer" src={pen} alt="" />
            </div>
          </div>
        </div>
        <Typography color="gray" className="font-medium mt-2">
          On min. purchase of AED {data?.min_amount}
        </Typography>
        <Typography color="gray" className="font-medium mt-2">
         discount {data?.discount_percentage}%
        </Typography>
        <Typography color="gray" className="font-medium mt-2">
          Code : {data?.code}
        </Typography>
        <Typography color="gray" className="font-medium mt-2">
          Expiry: {new Date(data?.expiry_date).toLocaleDateString()}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default MovieTicketCard;
