import React from "react";
import { ISellerFormProps } from "../../../models/seller-models/ISellerComponentsProps";

const SellerForm: React.FC<ISellerFormProps> = ({
  selectedSeller,
  addSeller,
  updateSeller,
  cancelSeller,
}: ISellerFormProps) => {
  return(
  <>
    <div>SellerForm</div>;
  </>
  )
};

export default SellerForm;
