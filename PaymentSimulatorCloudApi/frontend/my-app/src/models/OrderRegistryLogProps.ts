import { ActionType } from "./ActionType";

export interface OrderRegistryLog {
    id: number;
    orderDate: Date;
    sellerCpf: string;
    actionType: ActionType;
    orderRegistryJson: string;
    partitionKey: string;
    rowKey: string;
}