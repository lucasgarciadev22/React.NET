import { ISeller } from "../seller-models/ISeller";
import { IOrderProduct, IOrderRegistry, IOrderRegistryRequest } from "./IOrderRegistry";
import { IOrderRegistryLog } from "./IOrderRegistryLog";

export interface IOrderRegistryCardPorps {
  order: IOrderRegistryRequest;
  statusImg: string;
  editOrder: (id: number) => void;
  handleModalConfirm: (id: number) => void;
}

export interface IOrderRegistryFormProps {
  sellers:ISeller[];
  initialOrder:IOrderRegistryRequest;
  initialProduct:IOrderProduct;
  selectedOrder: IOrderRegistryRequest;
  addOrder: (order: IOrderRegistryRequest,products:IOrderProduct[]) => void;
  updateOrder: (order: IOrderRegistryRequest, products:IOrderProduct[]) => void;
  cancelOrder: () => void;
}

export interface IOrderRegistriesListProps {
  orders: IOrderRegistryRequest[];
  editOrder: (id: number) => void;
  handleModalConfirm: (id: number) => void;
}

export interface IOrderRegistryLogTileProps {
  orderLog: IOrderRegistryLog;
}

export interface IOrderRegistryLogsListProps {
  orderLogs: IOrderRegistryLog[];
}
