import React, {  } from "react";
import { ISellerCardProps } from "../../../models/seller-models/ISellerComponentsProps";
import * as S from "./styled";
import { GlobalButton } from "../../global/GlobalComponents";

const SellerCard: React.FC<ISellerCardProps> = ({
  seller,
  editSeller,
  handleModalConfirm,
}) => {

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
        <div className="d-flex justify-content-center">
          <GlobalButton variant="primary" onClick={() => editSeller(seller.id)}>
            Edit
          </GlobalButton>
          <GlobalButton
            variant="danger"
            onClick={() => handleModalConfirm(seller.id)}
          >
            Delete
          </GlobalButton>
        </div>
        <S.StyledNavLink href={`/sellers/sellerlogs/${seller.id}`}>
          Show Logs
        </S.StyledNavLink>
      </S.CardMain>
    </>
  );
};

export default SellerCard;
