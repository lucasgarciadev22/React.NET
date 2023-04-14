import { IOrderProduct } from "./IOrderRegistry";

export interface IOrderProductFormProps {
  initialProduct: IOrderProduct;
  handleOnAdd: (product: IOrderProduct) => void;
}
