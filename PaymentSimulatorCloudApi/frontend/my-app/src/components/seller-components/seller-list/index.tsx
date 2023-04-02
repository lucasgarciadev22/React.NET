import React from "react";
import { ISellersListProps } from "../../../models/seller-models/ISellerComponentsProps";
import SellerCard from "../seller-card";

const SellersList: React.FC<ISellersListProps> = ({
  sellers,
  sellersLogs,
  editSeller,
  handleModalConfirm,
}: ISellersListProps) => {
  const getSellerLogs = (sellerCpf: string) => {
    return sellersLogs.filter((log) => log.partitionKey === sellerCpf);
  };
  return (
    <>
      <div>SellersList</div>
      <div>
        {sellers.length > 0 &&
          sellers.map((seller) => (
            <SellerCard
              key={seller.id}
              seller={seller}
              editSeller={editSeller}
              handleModalConfirm={handleModalConfirm}
              sellerLogs={getSellerLogs(seller.cpf)}
            />
          ))}
      </div>
    </>
  );
};

export default SellersList;
