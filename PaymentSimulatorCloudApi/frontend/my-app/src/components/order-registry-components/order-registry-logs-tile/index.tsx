import React from "react";
import * as S from "./styled";
import { ActionType } from "../../../models/ActionType";
import { IOrderRegistryLogTileProps } from "../../../models/order-registry-models/IOrderRegistryComponentsProps";

const OrderLogTile: React.FC<IOrderRegistryLogTileProps> = ({
  orderLog,
}: IOrderRegistryLogTileProps) => {
  const renderActionType = (actionType: ActionType) => {
    switch (actionType) {
      case ActionType.Insert:
        return "Created";
      case ActionType.Update:
        return "Updated";
      case ActionType.Remove:
        return "Deleted";
      default:
        return "Unknown";
    }
  };

  return (
    <S.LogTile>
      <S.LogTitle>{renderActionType(orderLog.actionType)}</S.LogTitle>
      <S.LogTitle>Seller CPF: {orderLog.sellerCpf}</S.LogTitle>
      <S.LogDescription>JSON: {orderLog.orderRegistryJson}</S.LogDescription>
    </S.LogTile>
  );
};

export default OrderLogTile;
