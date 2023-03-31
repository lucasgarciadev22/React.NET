import React from 'react'
import { ISellerLog } from '../../../models/seller-models/ISellerLog';

const SellerLogTile: React.FC<ISellerLog> = ({ id, actionType, name, partitionKey, rowKey, sellerJson }: ISellerLog) => {
    return (
        <div>SellerLogTile</div>
    )
}

export default SellerLogTile;
