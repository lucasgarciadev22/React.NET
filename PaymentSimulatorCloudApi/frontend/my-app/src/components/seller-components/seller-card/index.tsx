import React from "react";
import { ISellerCardProps } from "../../../models/seller-models/ISellerComponentsProps";
import StyledCard from "./styled";
import { Card } from "react-bootstrap";

const SellerCard: React.FC<ISellerCardProps> = ({
  seller,
  ordersCount,
  profileImg,
}) => {
  return (
    <>
      <StyledCard title={`Seller ${seller.id} - ${seller.name}`} >
      </StyledCard>
    </>
  );
};

export default SellerCard;
