import React from "react";
import { ISellerCardProps } from "./../../models/SellerModels/ISellerComponentsProps";

const SellerCard: React.FC<ISellerCardProps> = ({
  seller,
  ordersCount,
  profileImg,
}) => {
  return (
    <>
      <div>SellerCard</div>
    </>
  );
};

export default SellerCard;
