import React from "react";
import { Card, Button } from "react-bootstrap";
import { ISellerCardProps } from "./../../models/SellerModels/ISellerComponentsProps";

const SellerCard: React.FC<ISellerCardProps> = ({
  seller,
  ordersCount,
  profileImg,
  editSeller,
  handleModalConfirm,
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={profileImg} />
      <Card.Body>
        <Card.Title>{seller.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{seller.email}</Card.Subtitle>
        <Card.Text>
          <div>CPF: {seller.cpf}</div>
          <div>Phone: {seller.phone}</div>
          <div>Orders count: {ordersCount}</div>
        </Card.Text>
        <Button variant="primary" onClick={() => editSeller(seller.id)}>
          Edit
        </Button>{" "}
        <Button
          variant="danger"
          onClick={() => handleModalConfirm(seller.id)}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SellerCard;
