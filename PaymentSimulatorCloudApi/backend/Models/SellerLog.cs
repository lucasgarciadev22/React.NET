using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Azure.Data.Tables;

namespace tech_test_payment_api.Models
{
    public class SellerLog : Seller, ITableEntity
    {
        public ActionType ActionType { get; set; }
        public string SellerJson { get; set; }
        //Azure Table properties...
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
        public SellerLog() { }
        public SellerLog(Seller seller, ActionType actionType, string partitionKey, string rowKey)
        {
            base.Id = seller.Id;
            base.Name = seller.Name;
            ActionType = actionType;
            SellerJson = JsonSerializer.Serialize(seller);
            PartitionKey = partitionKey;
            RowKey = rowKey;
        }
    }
}