import React from "react";
import { IOrderRegistryCardPorps } from "../../../models/order-registry-models/IOrderRegistryComponentsProps";
import * as S from "./styled";
import { GlobalButton, GlobalWrapper } from "../../global/GlobalComponents";
const OrderRegistryCard: React.FC<IOrderRegistryCardPorps> = ({
  order,
  editOrder,
  handleModalConfirm,
}: IOrderRegistryCardPorps) => {
  const displayDate =
    order.orderDate instanceof Date
      ? order.orderDate.toLocaleDateString()
      : new Date(Date.now()).toLocaleDateString();

  return (
    <>
      <S.CardMain>
        <S.Header>
          {order.id} - {order.orderNumber}
        </S.Header>
        <S.Body>
          <GlobalWrapper>
            <div>
              <S.Title>
                Status:
                <S.Highlight>{order.statusMessage}</S.Highlight>{" "}
              </S.Title>
              <S.Description>Last Updated: {displayDate}</S.Description>
            </div>
            <div>
              <S.Title>Seller:</S.Title>
              <p>{order.sellerName}</p>
              <p>{order.sellerCpf}</p>
            </div>
          </GlobalWrapper>
        </S.Body>
        <div className="d-flex justify-content-center">
          <GlobalButton variant="primary" onClick={() => editOrder(order.id)}>
            Edit
          </GlobalButton>
          <GlobalButton
            variant="danger"
            onClick={() => handleModalConfirm(order.id)}
          >
            Delete
          </GlobalButton>
        </div>
        <S.StyledNavLink href={`/orders/orderlogs/${order.id}`}>
          Show Logs
        </S.StyledNavLink>
      </S.CardMain>
    </>
  );
};

export default OrderRegistryCard;
