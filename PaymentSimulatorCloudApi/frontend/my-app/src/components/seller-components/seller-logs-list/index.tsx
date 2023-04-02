import React from "react";
import * as S from "./styled";
import { ISellerLogsListProps } from "../../../models/seller-models/ISellerComponentsProps";
import { ISellerLog } from "../../../models/seller-models/ISellerLog";
import SellerLogTile from "../seller-log-tile";

const SellerLogsList: React.FC<ISellerLogsListProps> = ({
  sellerLogs,
}: ISellerLogsListProps) => {
  return (
    <S.LogList>
      {sellerLogs.map((sellerLog: ISellerLog) => (
        <SellerLogTile key={sellerLog.id} sellerLog={sellerLog} />
      ))}
    </S.LogList>
  );
};

export default SellerLogsList;
