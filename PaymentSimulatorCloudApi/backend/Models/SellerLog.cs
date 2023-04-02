using System.Text.Json;
using Azure;
using Azure.Data.Tables;

namespace tech_test_payment_api.Models
{
  public class SellerLog : ITableEntity
  {
    public ActionType ActionType { get; set; }
    public string SellerJson { get; set; }
    //Azure Table properties...
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
    public int Id { get; set;}
    public string Name { get; set;}

    public SellerLog() { }
    public SellerLog(Seller seller, ActionType actionType, string partitionKey, string rowKey)
    {
      Id = seller.Id;
      Name = seller.Name;
      ActionType = actionType;
      SellerJson = JsonSerializer.Serialize(seller);
      PartitionKey = partitionKey;
      RowKey = rowKey;
    }
  }
}