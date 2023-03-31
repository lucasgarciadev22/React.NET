import { ISeller } from '../seller-models/ISeller';
export interface IOrderRegistry {
  id: number;
  statusMessage: string;
  seller: ISeller;
  orderNumber: string;
  orderDate: Date;
  orderStatus: OrderStatus;
  orderProducts:IOrderProduct[];
  orderProductsJson:string;
}

export interface IOrderProduct {
  name: string;
  price: number;
  size: string;
  wight: number;
}

export enum OrderStatus {
  Awaiting,
  Approved,
  Transporting,
  Delivered,
  Canceled,
  NotAllowed,
}
