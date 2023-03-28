import { ISeller } from "./ISeller";

export interface ISellerCardProps {
  seller: ISeller;
  profileImg: string;
  ordersCount: number;
  editSeller: (id: number) => void;
  handleModalConfirm: (id: number) => void;
}

export interface ISellerFormProps {
  selectedSeller: ISeller;
  addSeller: (seller: ISeller) => void;
  updateSeller: (seller: ISeller) => void;
  cancelSeller: () => void;
}

export interface ISellersListProps {
  sellers: ISeller[];
  editSeller: (id: number) => void;
  handleModalConfirm: (id: number) => void;
}
