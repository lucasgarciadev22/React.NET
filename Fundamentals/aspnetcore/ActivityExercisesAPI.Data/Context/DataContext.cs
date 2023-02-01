using Activity_2_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ActivityExercisesAPI.Data.Context
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<Activity> Activities { get; set; }
  }

}