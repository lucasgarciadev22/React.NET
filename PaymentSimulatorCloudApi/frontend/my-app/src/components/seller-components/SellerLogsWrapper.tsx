import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./../../api/PaymentApi";
import { ISeller } from "../../models/seller-models/ISeller";
import { ISellerLog } from "../../models/seller-models/ISellerLog";
import SellerLogsList from "./seller-logs-list";

const SellerLogsWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>(); //get route params
  const [selectedSeller, setSelectedSeller] = useState<ISeller>();
  const [selectedSellerLogs, setSelectedSellerLogs] = useState<ISellerLog[]>();

  //on render...
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await api.get(`Seller/${id}`);
        const fetchedSeller: ISeller = response.data;
        setSelectedSeller(fetchedSeller);
        console.log(fetchedSeller);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeller();
  }, [id]);

  //fetch seller logs when selectedSeller is defined
  useEffect(() => {
    const fetchSellerLog = async () => {
      try {
        const response = await api.get(
          `Seller/SellerLogs/${selectedSeller?.cpf}`
        );
        const fetchedSellerLog: ISellerLog[] = response.data;
        setSelectedSellerLogs(fetchedSellerLog);
        console.log(fetchedSellerLog);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedSeller && selectedSeller.cpf) {
      fetchSellerLog();
    }
  }, [selectedSeller]);

  //wrapper calls the main list component...
  return (
    <>
      {selectedSellerLogs ? (
        <SellerLogsList sellerLogs={selectedSellerLogs} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default SellerLogsWrapper;
