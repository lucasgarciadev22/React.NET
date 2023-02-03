using Activity_2_API.Models;
using ActivityExercisesAPI.Data.Mappings;
using Microsoft.EntityFrameworkCore;

namespace ActivityExercisesAPI.Data.Context
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<Activity> Activities { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.ApplyConfiguration(new ActivityMap());
    }
  }

}