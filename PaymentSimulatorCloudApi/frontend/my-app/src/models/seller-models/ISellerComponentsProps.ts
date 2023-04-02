import { ISeller } from "./ISeller";
import { ISellerLog } from "./ISellerLog";

export interface ISellerCardProps {
  seller: ISeller;
  sellerLogs: ISellerLog[];
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
  sellersLogs: ISellerLog[];
  editSeller: (id: number) => void;
  handleModalConfirm: (id: number) => void;
}

export interface ISellerLogTileProps{
  sellerLog:ISellerLog;
}
