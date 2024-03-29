import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./../../api/PaymentApi";
import { ISeller } from "../../models/seller-models/ISeller";
import SellerForm from "../seller-components/seller-form";

const SellerFormWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>(); //get route params
  const [selectedSeller, setSelectedSeller] = useState<ISeller>();

  //on render...
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await api.get(`Seller/${id}`);
        const fetchedSeller: ISeller = response.data;
        setSelectedSeller(fetchedSeller);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeller();
  }, [id]);

  //wrapper calls the main form component...
  return (
    <>
      {selectedSeller ? (
        <SellerForm
          selectedSeller={selectedSeller}
          addSeller={() => {}}
          updateSeller={() => {}}
          cancelSeller={() => {}}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default SellerFormWrapper;
