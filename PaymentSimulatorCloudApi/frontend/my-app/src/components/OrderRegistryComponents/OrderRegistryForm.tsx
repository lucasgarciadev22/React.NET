import React from "react";
import { IOrderRegistryFormProps } from "../../models/OrderRegistryModels/IOrderRegistryComponentsProps";

const OrderRegistryForm: React.FC<IOrderRegistryFormProps> = ({
  selectedOrder,
  addOrder,
  updateOrder,
  cancelOrder,
}) => {
  return (
    <>
      <div>OrderRegistryForm</div>
    </>
  );
};

export default OrderRegistryForm;
