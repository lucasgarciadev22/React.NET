using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

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

    public OrderRegistry() { }
    public OrderRegistry(Seller seller, DateTime orderDate, OrderProduct[] orderProducts, OrderStatus orderStatus)
    {
      SellerId = seller.Id;
      SellerCpf = seller.Cpf;
      SellerName = seller.Name;
      SellerEmail = seller.Email;
      SellerPhone = seller.Phone;
      OrderNumber = Guid.NewGuid().ToString().Substring(0, 8);//get first 8 nums from GUID to use as order number
      OrderDate = orderDate;
      OrderStatus = orderStatus;
      OrderProductsJson = JsonSerializer.Serialize(orderProducts);
    }
  }
}