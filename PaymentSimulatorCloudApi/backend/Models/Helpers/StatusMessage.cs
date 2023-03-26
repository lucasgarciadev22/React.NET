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

    public static string ShowConfirmationMessage(ClassType classType,string propertyName, string databaseName, ActionType actionType)
    {
      switch (actionType)
      {
        case ActionType.Update:
          return $"Data from {classType}: {propertyName} were updated in {databaseName}.";
        case ActionType.Remove:
          return $"Data from {classType}: {propertyName} were removed from {databaseName}.";
        default:
          return "Unknown confirmation message";
      }
    }
    public static string ShowErrorMessage(ClassType classType, string propertyName, string databaseName, ActionType? actionType)
    {
      switch (actionType)
      {
        case ActionType.Get:
        return $"{classType}: {propertyName} not found in {databaseName}. Please, register {classType}: {propertyName} data first.";
        default:
          return "Unknown error message";
      }
    }
  }
}