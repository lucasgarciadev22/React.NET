import { useState, useEffect } from "react";
import api from "../api/PaymentApi";
import SellersList from "../components/seller-components/seller-list";
import { ISeller } from "../models/seller-models/ISeller";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  NavLink,
} from "react-bootstrap";
import SellerForm from "../components/seller-components/seller-form";
import {
  GlobalButton,
  GlobalNavLink,
  GlobalWrapper,
} from "../components/global/GlobalComponents";
import { IOrderRegistry } from "../models/order-registry-models/IOrderRegistry";

const initialSeller: ISeller = {
  id: 0,
  name: "",
  cpf: "",
  email: "",
  orderCount: 0,
  phone: "",
};

const SellerView: React.FC = () => {
  const [fetchedSellers, setFetchedSellers] = useState<ISeller[]>([]);
  const [fetchedOrders, setFetchedOrders] = useState<IOrderRegistry[]>([]);
  const [seller, setSeller] = useState<ISeller>(initialSeller);
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
      if (responseOrder != undefined && responseSeller != undefined) {
        setFetchedSellers(responseSeller.data);
        setFetchedOrders(responseOrder.data);
        setIsLoading(false);
      }
    };
    fetchApiObjects();
  }, [fetchedSellers.length, fetchedOrders.length, seller]);

  //#region API Routes Methods
  const addSeller = async (seller: ISeller) => {
    const response = await api.post("Seller", seller);
    if (response != undefined) {
      setFetchedSellers([...fetchedSellers, response.data]);
      setIsLoading(false);
    }

    handleCloseConfirm();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const updateSeller = async (seller: ISeller) => {
    const response = await api.put(`Seller/${seller.id}`, seller);

    if (response != undefined) {
      setFetchedSellers(
        fetchedSellers.map((item) =>
          item.id === seller.id ? response.data : item
        )
      );
      setIsLoading(false);
    }
    handleCloseConfirm();
  };

  const deleteSeller = async (id: number) => {
    if (await api.delete(`Seller/${id}`)) {
      const filteredSeller = fetchedSellers.filter(
        (seller) => seller.id !== id
      );

      if (filteredSeller != undefined) {
        setFetchedSellers([...filteredSeller]);
        setIsLoading(false);
      }
      handleCloseConfirm();
    }
  };
  //#endregion

  //#region Event Handlers
  const filteredSellers = fetchedSellers.filter(
    (seller) =>
      seller.name &&
      seller.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const edit = (id: number) => {
    const selectedSeller = fetchedSellers.filter((seller) => seller.id === id);
    setSeller(selectedSeller[0]);
    handleShowForm();
  };

  const cancel = () => {
    setSeller(initialSeller);
    handleCloseConfirm();
  };

  const handleShowModal = (id: number) => {
    const selectedSeller = fetchedSellers.filter((seller) => seller.id === id);
    setSeller(selectedSeller[0]);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setSeller(initialSeller);
    setShowConfirm(false);
    setShowForm(false);
  };

  const handleShowFormClean = () => {
    setSeller(initialSeller);
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
          New Seller
        </Button>
        <InputGroup className="mb-3" style={{ marginTop: "16px" }}>
          <InputGroup.Text id="inputGroup-sizing-default">
            Search
          </InputGroup.Text>
          <Form.Control
            placeholder="Search clients by name..."
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <div>
          <h1>Registered sellers in Azure Cloud</h1>
        </div>
        <SellersList
          editSeller={edit}
          orders={fetchedOrders}
          handleModalConfirm={handleShowModal}
          sellers={filteredSellers}
        />
        <Modal show={showForm} onHide={handleCloseForm}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: "24px" }}>
              Seller {seller.id === 0 ? "" : seller.id}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SellerForm
              addSeller={addSeller}
              updateSeller={updateSeller}
              cancelSeller={cancel}
              selectedSeller={seller}
            />
          </Modal.Body>
          <Modal.Footer>
            <p>Create or edit your seller registries...</p>
          </Modal.Footer>
        </Modal>
        <Modal size="sm" show={showConfirm} onHide={handleCloseConfirm}>
          <ModalHeader closeButton>
            <ModalTitle style={{ fontSize: "24px" }}>
              Removing Seller {seller.id === 0 ? "" : seller.id}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>Are you sure you wanna remove "{seller.name}"?</ModalBody>
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
              onClick={() => deleteSeller(seller.id)}
            >
              <i className="fa-solid fa-check me-2"></i>
              Confirm
            </GlobalButton>
          </ModalFooter>
        </Modal>
        <br />
        <br />
        <GlobalNavLink href={"/"}>
          Back to Dashboard
        </GlobalNavLink>
      </GlobalWrapper>
    </>
  );
};
export default SellerView;
