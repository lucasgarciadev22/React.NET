import React from "react";
import { ISellersListProps } from "./../../models/SellerModels/ISellerComponentsProps";

const SellersList: React.FC<ISellersListProps> = ({
  sellers,
  editSeller,
  handleModalConfirm,
}: ISellersListProps) => {
  return (
    <>
      <div>SellersList</div>
    </>
  );
};

export default SellersList;
