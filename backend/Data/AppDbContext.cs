using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Expense> Expenses { get; set; } = null!;
    public DbSet<Income> Incomes { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
  }
}
