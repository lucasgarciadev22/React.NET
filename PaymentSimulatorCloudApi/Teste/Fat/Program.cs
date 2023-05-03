Using System;
class Program
{
  static void Main(string[] args)
  {
    double[] dailyRevenue = new double[365] { 10.0, 20.0, 30.0, /* ... */ };

    double smallestRevenue = double.MinValue;
    double largestRevenue = double.MaxValue;
    double totalRevenue = 0.0;
    int numDaysWithRevenue = 0;

    for (int i = 0; i < dailyRevenue.Length; i++)
    {
      // update the smallest and largest daily revenue if changes occur
      if (dailyRevenue[i] < smallestRevenue)
      {
        smallestRevenue = dailyRevenue[i];
      }
      if (dailyRevenue[i] > largestRevenue)
      {
        largestRevenue = dailyRevenue[i];
      }

      // check if the day had revenue and add to the annual average
      if (dailyRevenue[i] > 0.0)
      {
        totalRevenue += dailyRevenue[i];
        numDaysWithRevenue++;
      }
    }

    // calculate the annual average and check how many days had revenue above it
    double annualAverage = totalRevenue / numDaysWithRevenue;
    int numDaysAboveAverage = 0;
    for (int i = 0; i < dailyRevenue.Length; i++)
    {
      if (dailyRevenue[i] > annualAverage)
      {
        numDaysAboveAverage++;
      }
    }

    Console.WriteLine($"Smallest daily revenue: $ {smallestRevenue}");
    Console.WriteLine($"Largest daily revenue: $ {largestRevenue}");
    Console.WriteLine($"Number of days with revenue above the annual average: {numDaysAboveAverage}");
  }
}