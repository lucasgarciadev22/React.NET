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
    public SellerLog(int id, string cpf, string name, string email, string phone) : base(id, cpf, name, email, phone)
    {
    }

    public string PartitionKey { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    public string RowKey { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    public DateTimeOffset? Timestamp { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    public ETag ETag { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
  }
}