import React, { useEffect, useState } from "react";
import { ISellersListProps } from "../../../models/seller-models/ISellerComponentsProps";
import SellerCard from "../seller-card";
import * as S from "./styled";
import { ISeller } from "../../../models/seller-models/ISeller";
import { ListWrapper } from "../../global/GlobalComponents";

const SellersList: React.FC<ISellersListProps> = ({
  sellers,
  orders,
  editSeller,
  handleModalConfirm,
}: ISellersListProps) => {
  const [updatedSellers, setUpdatedSellers] = useState<ISeller[]>([]);

  useEffect(() => {
    const calculateOrderCount = (seller: ISeller) => {
      if (!orders || !seller) return; // handle undefined values
      const sellerOrders = orders.filter(
        (order) => order.seller?.id === seller.id
      );
      return { // return new seller object with updated ordercount prop
        ...seller,
        orderCount: sellerOrders?.length ?? 0,
      };
    };
    const updatedSellers = sellers
      .map((seller) => calculateOrderCount(seller))
      .filter((seller) => seller !== undefined) as ISeller[];

    setUpdatedSellers(updatedSellers);
  }, [sellers, orders]);

  return (
    <>
      <ListWrapper>
        {updatedSellers.length > 0 &&
          updatedSellers.map((seller) => (
            <SellerCard
              key={seller.id}
              seller={seller}
              editSeller={editSeller}
              handleModalConfirm={handleModalConfirm}
            />
          ))}
      </ListWrapper>
    </>
  );
};

export default SellersList;
