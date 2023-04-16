import React from "react";
import * as S from "./styled";
import { GlobalWrapper } from "../../global/GlobalComponents";
import { IOrderRegistryLogsListProps } from "../../../models/order-registry-models/IOrderRegistryComponentsProps";
import { IOrderRegistryLog } from "./../../../models/order-registry-models/IOrderRegistryLog";
import OrderLogTile from "../order-registry-logs-tile";

const OrderRegistryLogsList: React.FC<IOrderRegistryLogsListProps> = ({
  orderLogs,
}: IOrderRegistryLogsListProps) => {
  return (
    <GlobalWrapper>
      <S.LogList>
        {orderLogs.map((orderLog: IOrderRegistryLog) => (
          <OrderLogTile key={orderLog.id} orderLog={orderLog} />
        ))}
      </S.LogList>
    </GlobalWrapper>
  );
};

export default OrderRegistryLogsList;
