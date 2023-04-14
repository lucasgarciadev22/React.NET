using System.Text.Json;
using Azure;
using Azure.Data.Tables;

namespace tech_test_payment_api.Models
{
  public class OrderRegistryLog : OrderRegistry, ITableEntity
  {
    public ActionType ActionType { get; set; }
    public string OrderRegistryJson { get; set; }
    //Azure Table Properties...
    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
    public OrderRegistryLog() { }
    public OrderRegistryLog(OrderRegistry orderRegistry, ActionType actionType, string partitionKey, string rowKey)
    {
      base.Id = orderRegistry.Id;
      base.OrderDate = orderRegistry.OrderDate;
      base.SellerCpf = orderRegistry.SellerCpf;
      ActionType = actionType;
      OrderRegistryJson = JsonSerializer.Serialize(orderRegistry);
      PartitionKey = partitionKey;
      RowKey = rowKey;
    }
  }
}