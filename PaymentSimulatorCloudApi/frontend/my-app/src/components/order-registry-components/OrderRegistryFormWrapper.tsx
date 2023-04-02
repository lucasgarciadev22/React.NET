import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "./../../api/PaymentApi";
import { IOrderRegistry } from "../../models/order-registry-models/IOrderRegistry";

const OrderRegistryFormWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>(); //get route params
  const [selectedOrder, setSelectedOrder] = useState<IOrderRegistry>();

  useEffect(() => {
    const fetchOrderRegistry = async () => {
      try {
        const response = await api.get("OrderRegistry/{id}");
        const fetchedOrderRegistry: IOrderRegistry = response.data;
        setSelectedOrder(fetchedOrderRegistry);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderRegistry();
  }, [id]);

  return <div>OrderRegistryFormWrapper</div>;
};

export default OrderRegistryFormWrapper;
