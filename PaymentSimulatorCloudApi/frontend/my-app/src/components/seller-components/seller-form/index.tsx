import React from "react";
import { ISellerFormProps } from "../../../models/seller-models/ISellerComponentsProps";
import { Button, Form } from "react-bootstrap";
import { GlobalButton, GlobalButtonWrapper, GlobalWrapper } from "../../global/GlobalComponents";

const SellerForm: React.FC<ISellerFormProps> = ({
  selectedSeller,
  addSeller,
  updateSeller,
  cancelSeller,
}: ISellerFormProps) => {
  return(
  <>
    <Form>
      <Form.Group controlId="sellerForm">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Fulano da Silva"></Form.Control>
        <Form.Label>CPF</Form.Label>
        <Form.Control type="text" placeholder="111.222.333-44"></Form.Control>
        <Form.Label>Phone</Form.Label>
        <Form.Control type="phone" placeholder="+55 (47) 98877-6655"></Form.Control>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="fulano@email.com"></Form.Control>
      </Form.Group>
      <br />
      <br />
      <GlobalButtonWrapper>
      <Button variant="outline-danger">Cancel</Button>
      <Button variant="outline-success" type="submit">Confirm</Button>
      </GlobalButtonWrapper>
    </Form>
  </>
  )
};

export default SellerForm;
