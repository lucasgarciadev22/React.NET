import React from "react";
import { IOrderRegistryCardPorps } from "../../../models/order-registry-models/IOrderRegistryComponentsProps";

const OrderRegistryCard: React.FC<IOrderRegistryCardPorps> = ({
  order,
  statusImg,
  editOrder,
  handleModalConfirm,
}: IOrderRegistryCardPorps) => {
  return (
    <>
      <div>OrderRegistryCard</div>
    </>
  );
};

export default OrderRegistryCard;
