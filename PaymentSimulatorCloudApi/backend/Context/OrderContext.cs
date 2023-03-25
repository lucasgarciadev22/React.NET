using Microsoft.EntityFrameworkCore;
using tech_test_payment_api.Models;

namespace tech_test_payment_api.Context
{
#pragma warning disable CS1591
  public class OrderContext : DbContext
  {
    public OrderContext(DbContextOptions<OrderContext> options) : base(options)
    {

    }
    public DbSet<Seller> Sellers { get; set; }
    public DbSet<OrderRegistry> OrderRegistries { get; set; }

    //mapping foreign key Seller.Id in Seller table
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<OrderRegistry>()
          .HasOne(o => o.Seller)
          .WithMany()
          .HasForeignKey(o => o.SellerId);
    }
  }
#pragma warning restore CS1591
}