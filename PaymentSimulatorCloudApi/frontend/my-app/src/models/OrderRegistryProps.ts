import { Seller } from "./SellerProps";
export interface OrderRegistry {
  id: number;
  statusMessage: string;
  seller: Seller;
  orderNumber: string;
  orderDate: Date;
  orderStatus: OrderStatus;
  orderProducts:OrderProduct[];
  orderProductsJson:string;
}

export interface OrderProduct {
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
