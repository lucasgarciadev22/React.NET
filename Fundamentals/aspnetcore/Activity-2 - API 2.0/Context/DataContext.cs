using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Activity_1_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Activity_1_API.Context
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    public DbSet<Activity> Activities { get; set; }
  }
}