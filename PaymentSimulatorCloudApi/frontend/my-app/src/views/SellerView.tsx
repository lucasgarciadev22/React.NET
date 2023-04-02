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
} from "react-bootstrap";
import SellerForm from "../components/seller-components/seller-form";
import { GlobalButton } from "../components/global/GlobalComponents";

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
  const [seller, setSeller] = useState<ISeller>(initialSeller);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  //on render...
  useEffect(() => {
    async function fetchSellers() {
      const response = await api.get(`Seller/Sellers`);
      setFetchedSellers(response.data);
    }

    fetchSellers();
  }, [fetchedSellers.length]);

  //#region API Routes Methods
  const addSeller = async (seller: ISeller) => {
    const response = await api.post("Seller", seller);
    setFetchedSellers([...fetchedSellers, response.data]);
    handleCloseForm();
  };

  const updateSeller = async (seller: ISeller) => {
    const response = await api.put(`Seller${seller.id}`, seller);
    setFetchedSellers(
      fetchedSellers.map((item) =>
        item.id === seller.id ? response.data : item
      )
    );

    setSeller(initialSeller);
    handleCloseForm();
  };

  const deleteSeller = async (id: number) => {
    if (await api.delete(`Seller/${id}`)) {
      const filteredSeller = fetchedSellers.filter(
        (seller) => seller.id !== id
      );

      setFetchedSellers([...filteredSeller]);
      handleCloseConfirm();
    }
  };
  //#endregion

  //#region Event Handlers
  const edit = (id: number) => {
    const selectedSeller = fetchedSellers.filter((seller) => seller.id === id);
    setSeller(selectedSeller[0]);
    handleShowForm();
  };

  const cancel = () => {
    setSeller(initialSeller);
    handleCloseForm();
  };

  const handleModal = (id: number) => {
    const selectedSeller = fetchedSellers.filter((seller) => seller.id === id);
    setSeller(selectedSeller[0]);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setSeller(initialSeller);
    setShowConfirm(false);
  };

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);
  //#endregion

  return (
    <>
      <Button variant="outline-success" onClick={handleShowForm}>
        <i className="i fas fa-plus me-2"></i>
        New Activity
      </Button>
      <InputGroup className="mb-3" style={{ marginTop: "16px" }}>
        <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
        <Form.Control
          placeholder="Search clients by name..."
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <div>
        <h1>Registered sellers in Azure Cloud</h1>
      </div>
      <SellersList
        editSeller={edit}
        handleModalConfirm={handleModal}
        sellers={fetchedSellers}
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
            variant="danger"
            onClick={() => deleteSeller(seller.id)}
          >
            <i className="fa-solid fa-check me-2"></i>
            Confirm
          </GlobalButton>
          <GlobalButton variant="primary" onClick={() => handleCloseConfirm()}>
            <i className="fa-solid fa-ban me-2"></i>
            Cancel
          </GlobalButton>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default SellerView;
