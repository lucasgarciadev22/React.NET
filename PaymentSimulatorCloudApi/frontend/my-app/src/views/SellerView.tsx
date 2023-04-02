import { useState, useEffect } from "react";
import api from "../api/PaymentApi";
import SellersList from "../components/seller-components/seller-list";
import { ISeller } from "../models/seller-models/ISeller";
import { ISellerLog } from "../models/seller-models/ISellerLog";

export default function SellerView() {
  const [fetchedSellers, setFetchedSellers] = useState<ISeller[]>([]);
  const [fetchedSellerLogs, setFetchedSellerLogs] = useState<ISellerLog[]>([]);

  useEffect(() => {
    async function fetchSellers() {
      const response = await api.get(`/Sellers`);
      setFetchedSellers(response.data);
    }

    async function fetchSellersLogs(sellerCpf?:string) {
      const response = await api.get(`/Sellers/SellerLogs/${sellerCpf}`);
      setFetchedSellers(response.data);
    }
    
    fetchSellers();
    fetchSellersLogs();
  }, [fetchedSellers.length]);

  function edit() {}

  function add() {}

  function handleModal() {}

  return (
    <>
      <div>SellerView</div>
      <SellersList
        editSeller={edit}
        handleModalConfirm={handleModal}
        sellers={fetchedSellers}
        sellersLogs={fetchedSellerLogs}
      />
    </>
  );
}
