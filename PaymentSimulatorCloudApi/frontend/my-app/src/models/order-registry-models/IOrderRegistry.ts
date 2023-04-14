import { ISeller } from '../seller-models/ISeller';
export interface IOrderRegistry {
  id: number;
  statusMessage: string;
  seller: ISeller;
  orderNumber: string;
  orderDate: Date;
  orderStatus: OrderStatus;
  orderProducts:IOrderProduct[];
}

export interface IOrderRegistryRequest {
  id:number;
  statusMessage: string;
  orderNumber: string;
  orderDate: Date; // no formato ISO-8601
  orderStatus: OrderStatus;
  orderProducts: IOrderProduct[];
  orderProductsJson:string;
  sellerId: number;
  sellerCpf: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
}

export interface IOrderRegistryDto {
  id:number;
  statusMessage: string;
  orderNumber: string;
  orderDate: Date; // no formato ISO-8601
  orderStatus: OrderStatus;
  orderProducts: IOrderProduct[];
  seller:ISeller;
}

export interface IOrderProduct {
  name: string;
  price: number;
  size: Sizes;
  weight: number;
}

export enum Sizes{
  S,
  M,
  L,
  XL,
}

export enum OrderStatus {
  Awaiting,
  Approved,
  Transporting,
  Delivered,
  Canceled,
  NotAllowed,
}
