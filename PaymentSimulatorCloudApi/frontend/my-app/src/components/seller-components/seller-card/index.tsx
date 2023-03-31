import React from "react";
import { ISellerCardProps } from "../../../models/seller-models/ISellerComponentsProps";
import * as S from "./styled";

const SellerCard: React.FC<ISellerCardProps> = ({
  seller,
  ordersCount,
  profileImg,
}) => {
  return (
    <>
      <S.CardMain title={`Seller ${seller.id} - ${seller.name}`} >
        <S.Header/>
      </S.CardMain>
    </>
  );
};

export default SellerCard;
