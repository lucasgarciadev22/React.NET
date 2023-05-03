using System;
using System.Collections.Generic;

class Program
{
  static void Main(string[] args)
  {
    Dictionary<string, double> monthlyRevenueByState = new Dictionary<string, double>()
    {
      { "SP", 67836.43 },
      { "RJ", 36678.66 },
      { "MG", 29229.88 },
      { "ES", 27165.48 },
      { "Other", 19849.53 }
    };

    double totalMonthlyRevenue = 0.0;
    foreach (var state in monthlyRevenueByState)
    {
      totalMonthlyRevenue += state.Value;
    }

    Console.WriteLine($"Total monthly revenue: R$ {totalMonthlyRevenue}");

    foreach (var state in monthlyRevenueByState)
    {
      double representationPercentage = state.Value / totalMonthlyRevenue * 100;
      Console.WriteLine($"{state.Key}: {representationPercentage.ToString("N2")}%");
    }
  }
}