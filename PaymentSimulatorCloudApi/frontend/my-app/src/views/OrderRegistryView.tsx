import React, { useEffect, useState } from "react";
import {
  GlobalButton,
  GlobalNavLink,
  GlobalWrapper,
} from "../components/global/GlobalComponents";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import api from "../api/PaymentApi";
import { ISeller } from "../models/seller-models/ISeller";
import OrderRegistryForm from "./../components/order-registry-components/order-registry-form/index";
import OrderRegistriesList from "../components/order-registry-components/order-registries-list";
import {
  IOrderProduct,
  Sizes,
} from "../models/order-product-models/IOrderProduct";
import {
  IOrderRegistryRequest,
  OrderStatus,
} from "../models/order-registry-models/IOrderRegistry";

const OrderRegistryView: React.FC = () => {
  const initialProduct: IOrderProduct = {
    name: "",
    price: 0,
    size: Sizes.S,
    weight: 0,
  };

  const initialSeller: ISeller = {
    id: 0,
    name: "",
    cpf: "",
    email: "",
    orderCount: 0,
    phone: "",
  };

  const initialOrder: IOrderRegistryRequest = {
    id: 0,
    statusMessage: "",
    orderNumber: "",
    orderStatus: OrderStatus.NotAllowed,
    orderDate: new Date(),
    orderProductsJson: "",
    orderProducts: [],
    sellerId: initialSeller.id,
    sellerEmail: initialSeller.email,
    sellerPhone: initialSeller.phone,
    sellerCpf: initialSeller.cpf,
    sellerName: initialSeller.name,
  };

  const [fetchedSellers, setFetchedSellers] = useState<ISeller[]>([]);
  const [fetchedOrders, setFetchedOrders] = useState<IOrderRegistryRequest[]>(
    []
  );
  const [order, setOrder] = useState<IOrderRegistryRequest>(initialOrder);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  //on render...
  useEffect(() => {
    const fetchApiObjects = async () => {
      const responseSeller = await api.get("Seller/Sellers");
      const responseOrder = await api.get("OrderRegistry/OrderRegistries");
      console.log("responseSeller:", responseSeller);
      console.log("responseOrder:", responseOrder);
      if (responseOrder && responseSeller) {
        setFetchedSellers(responseSeller.data);
        setFetchedOrders(responseOrder.data);
        setIsLoading(false);
      }
    };
    fetchApiObjects();
  }, [fetchedSellers.length, fetchedOrders.length, order]);

  //#region API Routes Methods
  const addOrder = async (
    order: IOrderRegistryRequest,
    products: IOrderProduct[]
  ) => {
    const orderWithProducts: IOrderRegistryRequest = {
      ...order,
      orderProducts: products,
      orderProductsJson: JSON.stringify(products),
    };

    const response = await api.post("OrderRegistry", orderWithProducts);
    if (response) {
      setFetchedOrders([...fetchedOrders, response.data]);
      setIsLoading(false);
    }

    handleCloseConfirm();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updateOrder = async (
    order: IOrderRegistryRequest,
    products: IOrderProduct[]
  ) => {
    const orderWithProducts: IOrderRegistryRequest = {
      ...order,
      orderProducts: products,
      orderProductsJson: JSON.stringify(products),
    };

    const response = await api.put(
      `OrderRegistry/${orderWithProducts.id}`,
      orderWithProducts
    );

    if (response) {
      setFetchedOrders(
        fetchedSellers.map((item) =>
          item.id === order.id ? response.data : item
        )
      );
      setIsLoading(false);
    }
    handleCloseConfirm();
  };

  const deleteOrder = async (id: number) => {
    if (await api.delete(`OrderRegistry/${id}`)) {
      const filteredOrder = fetchedOrders.filter((order) => order.id !== id);

      if (filteredOrder) {
        setFetchedOrders([...filteredOrder]);
        setIsLoading(false);
      }
      handleCloseConfirm();
    }
  };
  //#endregion

  //#region Event Handlers
  const filteredOrders = fetchedOrders.filter(
    (seller) =>
      seller.orderNumber &&
      seller.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const edit = (id: number) => {
    const selectedOrder = fetchedOrders.filter((order) => order.id === id);
    setOrder(selectedOrder[0]);
    handleShowForm();
  };

  const cancel = () => {
    setOrder(initialOrder);
    handleCloseConfirm();
  };

  const handleShowModal = (id: number) => {
    const selectedOrder = fetchedOrders.filter((order) => order.id === id);
    setOrder(selectedOrder[0]);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOrder(initialOrder);
    setShowConfirm(false);
    setShowForm(false);
  };

  const handleShowFormClean = () => {
    setOrder(initialOrder);
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);
  //#endregion

  return (
    <>
      <GlobalWrapper>
        <Button variant="outline-success" onClick={handleShowFormClean}>
          <i className="i fas fa-plus me-2"></i>
          New Order
        </Button>
        <InputGroup className="mb-3" style={{ marginTop: "16px" }}>
          <InputGroup.Text id="inputGroup-sizing-default">
            Search
          </InputGroup.Text>
          <Form.Control
            placeholder="Search orders by number..."
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <div>
          <h1>Registered orders in Azure Cloud</h1>
        </div>
        <OrderRegistriesList
          editOrder={edit}
          key={order.id}
          orders={filteredOrders}
          handleModalConfirm={handleShowModal}
        />
        <Modal show={showForm} onHide={handleCloseForm}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "24px" }}>
              Order {order.id === 0 ? "" : order.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OrderRegistryForm
              addOrder={addOrder}
              updateOrder={updateOrder}
              cancelOrder={cancel}
              selectedOrder={order}
              initialOrder={initialOrder}
              sellers={fetchedSellers}
              initialProduct={initialProduct}
            />
          </Modal.Body>
          <Modal.Footer>
            <p>Create or edit your order registries...</p>
          </Modal.Footer>
        </Modal>
        <Modal size="sm" show={showConfirm} onHide={handleCloseConfirm}>
          <ModalHeader closeButton>
            <ModalTitle style={{ fontSize: "24px" }}>
              Removing Order {order.id === 0 ? "" : order.id}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            Are you sure you wanna remove "{order.orderNumber}"?
          </ModalBody>
          <ModalFooter>
            <GlobalButton
              variant="primary"
              onClick={() => handleCloseConfirm()}
            >
              <i className="fa-solid fa-ban me-2"></i>
              Cancel
            </GlobalButton>
            <GlobalButton
              variant="danger"
              onClick={() => deleteOrder(order.id)}
            >
              <i className="fa-solid fa-check me-2"></i>
              Confirm
            </GlobalButton>
          </ModalFooter>
        </Modal>
        <br />
        <br />
        <GlobalNavLink href={"/"}>Back to Dashboard</GlobalNavLink>
      </GlobalWrapper>
    </>
  );
};
export default OrderRegistryView;
