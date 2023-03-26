using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using tech_test_payment_api.Context;

namespace tech_test_payment_api.Models
{
  public class OrderRegistry
  {
    [Key()]
    public int Id { get; set; }
    public string StatusMessage { get; set; }
    [ForeignKey("Seller")]
    public int SellerId { get; set; }
    public string SellerCpf { get; set; }
    public string SellerName { get; set; }
    public string SellerEmail { get; set; }
    public string SellerPhone { get; set; }
    public string OrderNumber { get; set; }
    public DateTime OrderDate { get; set; }
    public OrderStatus OrderStatus { get; set; }
    public string OrderProductsJson { get; set; }

    [NotMapped]
    public OrderProduct[] OrderProducts { get; set; }

    public OrderRegistry(int sellerId, string orderNumber, DateTime orderDate, OrderProduct[] orderProducts, OrderStatus orderStatus)
    {
      Seller seller;
      var contextOptions = new DbContextOptionsBuilder<OrderContext>();
      contextOptions.UseSqlServer("StandardDBConnection");

      using (OrderContext context = new OrderContext(contextOptions.Options))
      {
        seller = context.Sellers.Find(sellerId);
      }
      SellerId = seller.Id;
      SellerCpf = seller.Cpf;
      SellerName = seller.Name;
      SellerEmail = seller.Email;
      SellerPhone = seller.Phone;
      OrderNumber = orderNumber;
      OrderDate = orderDate;
      OrderProducts = orderProducts;
      OrderStatus = orderStatus;
      OrderProductsJson = JsonSerializer.Serialize(orderProducts);
    }
    public OrderRegistry() { }

  }
}