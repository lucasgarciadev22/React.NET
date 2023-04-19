import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "./../../api/PaymentApi";
import { IOrderRegistryRequest } from "../../models/order-registry-models/IOrderRegistry";
import OrderRegistryView from "../../views/OrderRegistryView";

const OrderRegistryFormWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>(); //get route params
  const [selectedOrder, setSelectedOrder] = useState<IOrderRegistryRequest>();

  useEffect(() => {
    const fetchOrderRegistry = async () => {
      try {
        const response = await api.get("OrderRegistry/{id}");
        const fetchedOrderRegistry: IOrderRegistryRequest = response.data;
        setSelectedOrder(fetchedOrderRegistry);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderRegistry();
  }, [id]);
  return (
    <>
      {selectedOrder ? (
        <OrderRegistryView />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default OrderRegistryFormWrapper;
