import { ActionType } from "./ActionType";

export interface ISellerLog {
    id: number;
    name: string;
    sellerJson: string;
    actionType: ActionType;
    partitionKey: string;
    rowKey: string;
}