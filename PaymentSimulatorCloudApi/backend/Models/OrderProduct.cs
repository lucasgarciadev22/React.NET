using tech_test_payment_api.Models.Enums;

namespace tech_test_payment_api.Models
{
  public class OrderProduct
  {
    public string Name { get; set; }

    public decimal Price { get; set; }

    public ProductSize Size { get; set; }

    public float Weight { get; set; }
  }
}