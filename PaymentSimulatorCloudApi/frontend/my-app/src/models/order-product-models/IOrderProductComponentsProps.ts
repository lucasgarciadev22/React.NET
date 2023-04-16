import { IOrderProduct } from "./IOrderProduct";

export interface IOrderProductFormProps {
  initialProduct: IOrderProduct;
  handleOnAdd: (product: IOrderProduct) => void;
}
