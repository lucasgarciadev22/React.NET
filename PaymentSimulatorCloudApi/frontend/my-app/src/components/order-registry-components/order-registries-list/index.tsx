import React from "react";
import { IOrderRegistriesListProps } from "../../../models/order-registry-models/IOrderRegistryComponentsProps";
import OrderRegistryCard from "../order-registry-card";
import { ListWrapper } from "../../global/GlobalComponents";

const OrderRegistriesList: React.FC<IOrderRegistriesListProps> = ({
  orders,
  editOrder,
  handleModalConfirm,
}: IOrderRegistriesListProps) => {
  return (
    <>
      <ListWrapper>
        {orders.length > 0 &&
          orders.map((order) => (
            <OrderRegistryCard
              key={order.id}
              order={order}
              editOrder={editOrder}
              handleModalConfirm={handleModalConfirm}
            />
          ))}
      </ListWrapper>
    </>
  );
};

export default OrderRegistriesList;
