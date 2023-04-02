import React, { useEffect, useState } from "react";
import { ISellersListProps } from "../../../models/seller-models/ISellerComponentsProps";
import SellerCard from "../seller-card";
import * as S from "./styled";
import { IOrderRegistry } from "../../../models/order-registry-models/IOrderRegistry";
import api from "../../../api/PaymentApi";
import { ISeller } from "../../../models/seller-models/ISeller";

const SellersList: React.FC<ISellersListProps> = ({
  sellers,
  editSeller,
  handleModalConfirm,
}: ISellersListProps) => {
  const [sellerOrders, setSellerOrders] = useState<IOrderRegistry[]>();
  useEffect(() => {
    const fetchSeller = async (seller: ISeller) => {
      try {
        const response = await api.get(`OrderRegistry/SellerId/${seller.id}`);
        const fetchedOrders: IOrderRegistry[] = response.data;
        setSellerOrders(fetchedOrders);
        if (sellerOrders != undefined) {
          seller.orderCount = sellerOrders.length;
        }
      } catch (error) {
        console.error(error);
      }
    };

    sellers.forEach((seller) => fetchSeller(seller));
  }, [sellers]);

  return (
    <>
      <S.ListWrapper>
        {sellers.length > 0 &&
          sellers.map((seller) => (
            <SellerCard
              key={seller.id}
              seller={seller}
              editSeller={editSeller}
              handleModalConfirm={handleModalConfirm}
            />
          ))}
      </S.ListWrapper>
    </>
  );
};

export default SellersList;
