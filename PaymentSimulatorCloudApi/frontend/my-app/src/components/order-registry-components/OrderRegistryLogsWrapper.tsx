import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./../../api/PaymentApi";
import { IOrderRegistryRequest } from "../../models/order-registry-models/IOrderRegistry";
import { IOrderRegistryLog } from "../../models/order-registry-models/IOrderRegistryLog";
import OrderRegistryLogsList from "./order-registry-logs-list";

const OrderRegistryLogsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>(); //get route params
  const [selectedOrder, setSelectedOrder] = useState<IOrderRegistryRequest>();
  const [fetchedOrderLogs, setFetchedOrderLogs] =
    useState<IOrderRegistryLog[]>();

  //on render...
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`OrderRegistry/${id}`);
        const fetchedOrder: IOrderRegistryRequest = response.data;
        setSelectedOrder(fetchedOrder);
        console.log(fetchedOrder);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [id]);

  //fetch seller logs when selectedSeller is defined
  useEffect(() => {
    const fetchOrderLog = async () => {
      try {
        const response = await api.get(
          `OrderRegistry/OrderRegistryLogs/${selectedOrder?.orderNumber}`
        );
        const fetchedOrderLog: IOrderRegistryLog[] = response.data;
        setFetchedOrderLogs(fetchedOrderLog);
        console.log(fetchedOrderLog);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedOrder && selectedOrder.sellerCpf) {
      fetchOrderLog();
    }
  }, [selectedOrder]);

  //wrapper calls the main list component...
  return (
    <>
      {fetchedOrderLogs ? (
        <OrderRegistryLogsList orderLogs={fetchedOrderLogs} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default OrderRegistryLogsWrapper;
