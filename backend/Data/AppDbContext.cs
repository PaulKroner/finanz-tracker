using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Expense> Expenses { get; set; } = null!;
    public DbSet<Income> Incomes { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      List<IdentityRole> roles = new List<IdentityRole>
      {
        new IdentityRole
        {
          Id = "f728c292-66d1-4d33-bc46-5f8e56d78901",
          Name = "Admin",
          NormalizedName = "ADMIN"
        },
        new IdentityRole
        {
          Id = "b2a9e013-1a2f-4c5d-9f8e-7e6d5c4b3a21",
          Name = "User",
          NormalizedName = "USER"
        },
      };
      builder.Entity<IdentityRole>().HasData(roles);
    }
  }
}
