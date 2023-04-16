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