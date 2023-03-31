import React from "react";
import { ISellerCardProps } from "../../models/seller-models/ISellerComponentsProps";
import { Card } from "react-bootstrap";

const SellerCard: React.FC<ISellerCardProps> = ({
  seller,
  ordersCount,
  profileImg,
}) => {
  return (
    <>
      <Card title={`Seller ${seller.id} - ${seller.name}`} >
        
      </Card>
    </>
  );
};

export default SellerCard;
