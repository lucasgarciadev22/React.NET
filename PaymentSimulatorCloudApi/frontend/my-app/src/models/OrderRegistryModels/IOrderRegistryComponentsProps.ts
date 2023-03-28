import { IOrderRegistry } from "./IOrderRegistry";
import { IOrderRegistryLog } from './IOrderRegistryLog';

export interface IOrderRegistryCardPorps {
  order: IOrderRegistry;
  statusImg: string;
  editOrder: (id: number) => void;
  handleModalConfirm: (id: number) => void;
}

export interface IOrderRegistryFormProps {
  selectedOrder: IOrderRegistry;
  addOrder: (order: IOrderRegistry) => void;
  updateOrder: (order: IOrderRegistry) => void;
  cancelOrder: () => void;
}

export interface IOrderRegistriesListProps {
  orders: IOrderRegistry[];
  ordersLogs: IOrderRegistryLog[];
  editOrder: (id: number) => void;
  handleModalConfirm: (id: number) => void;
}
