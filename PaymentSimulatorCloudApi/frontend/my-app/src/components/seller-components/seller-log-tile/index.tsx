import React from "react";
import { ISellerLogTileProps } from "../../../models/seller-models/ISellerComponentsProps";

import * as S from "./styled";
import { ActionType } from "../../../models/ActionType";

const SellerLogTile: React.FC<ISellerLogTileProps> = ({
  sellerLog,
}: ISellerLogTileProps) => {
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
      <S.LogTitle>{renderActionType(sellerLog.actionType)}</S.LogTitle>
      <S.LogDescription>{sellerLog.name}</S.LogDescription>
      <S.LogDescription>{sellerLog.sellerJson}</S.LogDescription>
    </S.LogTile>
  );
};

export default SellerLogTile;
