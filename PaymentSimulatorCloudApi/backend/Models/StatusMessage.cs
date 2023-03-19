namespace tech_test_payment_api.Models
{
  public static class StatusMessage
    {
        public static string ShowStatusMessage(OrderStatus status)
        {
            switch (status)
            {
                case OrderStatus.Awaiting:
                return "Awaiting payment";
                case OrderStatus.Approved:
                    return "Payment approved";
                case OrderStatus.Transporting:
                    return "Sent to transporting";
                case OrderStatus.Delivered:
                    return "Delivered";
                case OrderStatus.Canceled:
                    return "Canceled";
                default:
                    return "Unknown status";
            }
        }
    }
}