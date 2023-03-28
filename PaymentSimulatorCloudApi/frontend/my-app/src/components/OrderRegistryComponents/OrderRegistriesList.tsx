import React from "react";
import { IOrderRegistriesListProps } from "../../models/OrderRegistryModels/IOrderRegistryComponentsProps";

const OrderRegistriesList: React.FC<IOrderRegistriesListProps> = ({
  orders,
  ordersLogs,
  editOrder,
  handleModalConfirm,
}: IOrderRegistriesListProps) => {
  return <div>OrderRegistriesList</div>;
};

export default OrderRegistriesList;
