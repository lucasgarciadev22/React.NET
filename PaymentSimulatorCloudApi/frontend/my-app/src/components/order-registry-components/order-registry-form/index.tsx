import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { IOrderRegistryFormProps } from "../../../models/order-registry-models/IOrderRegistryComponentsProps";
import { GlobalButtonWrapper } from "../../global/GlobalComponents";
import * as S from "./styled";
import OrderProductForm from "../../order-product-components/order-product-form";
import {
  IOrderProduct,
  Sizes,
} from "../../../models/order-product-models/IOrderProduct";
import {
  IOrderRegistryRequest,
  OrderStatus,
} from "../../../models/order-registry-models/IOrderRegistry";

const OrderRegistryForm: React.FC<IOrderRegistryFormProps> = ({
  selectedOrder,
  addOrder,
  updateOrder,
  cancelOrder,
  initialOrder,
  initialProduct,
  sellers,
}) => {
  const [order, setOrder] = useState<IOrderRegistryRequest>(currentOrder());
  const [orderProducts, setOrderProducts] = useState<IOrderProduct[]>([]);

  function currentOrder(): IOrderRegistryRequest {
    if (selectedOrder.id !== 0) {
      return selectedOrder;
    } else {
      return initialOrder;
    }
  }

  useEffect(() => {
    if (selectedOrder.id !== 0) {
      setOrder(selectedOrder);
    }
  }, [selectedOrder]);

  function getSizeText(size: Sizes) {
    switch (size) {
      case Sizes.S:
        return "Small";
      case Sizes.M:
        return "Medium";
      case Sizes.L:
        return "Large";
      case Sizes.XL:
        return "Extra Large";
      default:
        return "";
    }
  }

  //#region Event Handlers
  const handleSellerIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSellerId = parseInt(e.target.value);
    const selectedSeller = sellers.filter(
      (seller) => seller.id === selectedSellerId
    );
    if (selectedSeller.length > 0) {
      setOrder({
        ...order,
        sellerId: selectedSeller[0].id,
        sellerCpf: selectedSeller[0].cpf,
        sellerEmail: selectedSeller[0].email,
        sellerName: selectedSeller[0].name,
        sellerPhone: selectedSeller[0].phone,
      });
    }
  };

  const handlePaymentStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrder({
      ...order,
      orderStatus: parseInt(e.target.value) as OrderStatus,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (order.id === 0) {
      addOrder(order, orderProducts);
    } else {
      updateOrder(order, orderProducts);
    }
  };

  const handleButtonCancel = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    cancelOrder();

    setOrder(initialOrder);
  };

  const handleRemoveOrderProduct = (index: number) => {
    const updatedOrderProducts = [...orderProducts];
    updatedOrderProducts.splice(index, 1);
    setOrderProducts(updatedOrderProducts);
  };

  const handleOnAddOrderProduct = (newProduct: IOrderProduct) => {
    setOrderProducts((prevOrderProducts) => [...prevOrderProducts, newProduct]);
  };
  //#endregion
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Seller ID or CPF</Form.Label>
          <Form.Select
            title="Sellect a Seller"
            value={order.sellerId}
            onChange={handleSellerIdChange}
          >
            <option value="">Select a seller</option>
            {sellers.map((seller) => (
              <option key={seller.id} value={seller.id}>
                {seller.name} ({seller.cpf})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Order Status</Form.Label>
          <Form.Select
            value={order.orderStatus}
            onChange={handlePaymentStatusChange}
            title="Select a payment status"
          >
            <option value={OrderStatus.Awaiting}>Awaiting Payment...</option>
            <option value={OrderStatus.Approved}>Payment Approved</option>
            <option value={OrderStatus.Transporting}>Transporting...</option>
            <option value={OrderStatus.Delivered}>Delivered</option>
            <option value={OrderStatus.Canceled}>Canceled</option>
            <option value={OrderStatus.NotAllowed}>None </option>
          </Form.Select>
        </Form.Group>
        <hr />
        <Form.Group className="mb-3">
          <h5>Order Products</h5>
          <ul>
            {orderProducts.map((orderProduct, index) => (
              <li key={index}>
                {orderProduct.name} - {orderProduct.price} -{" "}
                {getSizeText(orderProduct.size)} - {orderProduct.weight}
                <S.CloseClickIcon
                  onClick={() => handleRemoveOrderProduct(index)}
                >
                  <i className="fa-solid fa-circle-xmark"></i>
                </S.CloseClickIcon>
              </li>
            ))}
          </ul>
        </Form.Group>
        <OrderProductForm
          handleOnAdd={handleOnAddOrderProduct}
          initialProduct={initialProduct}
        />
        <GlobalButtonWrapper>
          <Button variant="outline-danger" onClick={handleButtonCancel}>
            Cancel
          </Button>
          <div>
            {order.id === 0 ? (
              <Button variant="outline-success" type="submit">
                Add
              </Button>
            ) : (
              <Button variant="outline-success" type="submit">
                Update
              </Button>
            )}
          </div>
        </GlobalButtonWrapper>
      </Form>
    </>
  );
};

export default OrderRegistryForm;
