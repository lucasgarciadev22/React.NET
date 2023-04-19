import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import {
  IOrderProduct,
  Sizes,
} from "../../../models/order-product-models/IOrderProduct";
import { IOrderProductFormProps } from "../../../models/order-product-models/IOrderProductComponentsProps";
import * as S from "./styled";

const OrderProductForm: React.FC<IOrderProductFormProps> = ({
  initialProduct,
  handleOnAdd,
}: IOrderProductFormProps) => {
  const [product, setProduct] = useState<IOrderProduct>(initialProduct);

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, name: e.target.value });
  };

  const handleProductPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, ""); // Remove non-numeric characters
    setProduct({ ...product, price: parseFloat(value) });
  };

  const handleProductSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct({ ...product, size: parseInt(e.target.value) as Sizes });
  };

  const handleProductWeightChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^\d.]/g, ""); // Remove non-numeric characters
    setProduct({ ...product, weight: parseFloat(value) });
  };

  const handleAddOrderProduct = () => {
    handleOnAdd(product);
    setProduct(initialProduct);
  };

  return (
    <>
      <Form.Label>Product Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Product Name"
        name="name"
        value={product.name}
        onChange={handleProductNameChange}
      />
      <Form.Label>Product Price</Form.Label>
      <Form.Control
        type="number"
        placeholder="Price"
        name="price"
        value={product.price}
        onChange={handleProductPriceChange}
        pattern="\d+(\.\d{1,2})?"
      />
      <Form.Label>Product Size</Form.Label>
      <Form.Select
        title="Select Product Size"
        name="size"
        value={product.size}
        onChange={handleProductSizeChange}
      >
        <option value={Sizes.S}>Small</option>
        <option value={Sizes.M}>Medium</option>
        <option value={Sizes.L}>Large</option>
        <option value={Sizes.XL}>Extra Large</option>
      </Form.Select>
      <Form.Label>Product Weight</Form.Label>
      <Form.Control
        type="number"
        name="weight"
        value={product.weight}
        onChange={handleProductWeightChange}
        pattern="[0-9]+(\.[0-9]+)?"
      />
      <S.FormWrapper>
        <Button variant="success" onClick={() => handleAddOrderProduct()}>
          Add Product
        </Button>
      </S.FormWrapper>
    </>
  );
};

export default OrderProductForm;
