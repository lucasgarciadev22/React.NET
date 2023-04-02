import React, { useState } from "react";
import { ISellerCardProps } from "../../../models/seller-models/ISellerComponentsProps";
import * as S from "./styled";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import SellerLogTile from "../seller-log-tile";

const SellerCard: React.FC<ISellerCardProps> = ({
  seller,
  editSeller,
  handleModalConfirm,
  sellerLogs,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <S.CardMain>
        <S.Header>
          {seller.id} - {seller.name}
        </S.Header>
        <S.Body>
          <div>
            <S.Title>
              Orders:
              <S.Highlight>{seller.orderCount}</S.Highlight>{" "}
            </S.Title>
            <S.Description>{seller.cpf}</S.Description>
          </div>
          <div>
            <p>{seller.email}</p>
            <p>{seller.phone}</p>
          </div>
        </S.Body>
        <div className="d-flex justify-content-end pt-2 m-0 border-top">
          <Button onClick={() => editSeller(seller.id)}>Edit</Button>
          <Button onClick={() => handleModalConfirm(seller.id)}>Delete</Button>
          <DropdownButton
            id={`dropdown-${seller.id}`}
            title="Logs"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            show={isDropdownOpen}
          >
            {sellerLogs.map((log) => (
              <Dropdown.Item key={log.id}>
                <SellerLogTile key={log.id} sellerLog={log} />
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      </S.CardMain>
    </>
  );
};

export default SellerCard;
