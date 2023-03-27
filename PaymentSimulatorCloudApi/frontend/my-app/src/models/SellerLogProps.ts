import { ActionType } from "./ActionType";

export interface SellerLog {
    id: number;
    name: string;
    sellerJson: string;
    actionType: ActionType;
    partitionKey: string;
    rowKey: string;
}