using ActivityExercisesAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ActivityExercisesAPI.Data.Mappings
{
  public class ActivityMap : IEntityTypeConfiguration<Activity>
  {
    public void Configure(EntityTypeBuilder<Activity> builder)
    {
        builder.ToTable("Activities");
        builder.Property(act => act.Title).HasColumnType("varchar(100)");

        builder.Property(act => act.Description).HasColumnType("varchar(255)");
    }
  }
}