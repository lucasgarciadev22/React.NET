using Azure.Data.Tables;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Storage;
using tech_test_payment_api.Context;

namespace tech_test_payment_api.Models.Helpers
{
  public static class ContextHelper
  {
    public static string GetCurrentCatalog(OrderContext context)
    {
      IDbContextTransaction transaction = context.Database.CurrentTransaction;
      if (transaction == null)
      {
        return null;
      }

      string connectionString = transaction.GetDbTransaction().Connection.ConnectionString;
      var builder = new SqlConnectionStringBuilder(connectionString);
      return builder.InitialCatalog;
    }
    public static TableClient GetAzureTableClient(string tableName, string storageAccConnection)
    {
      TableServiceClient serviceClient = new TableServiceClient(storageAccConnection);
      TableClient tableClient = serviceClient.GetTableClient(tableName);

      tableClient.CreateIfNotExists();

      return tableClient;
    }

    public static string GenerateOrderNumber()
    {
      return Guid.NewGuid().ToString().Substring(0, 8);
    }

  }
}