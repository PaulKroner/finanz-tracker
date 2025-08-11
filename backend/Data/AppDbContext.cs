using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace backend.Data
{
  public class AppDbContext : IdentityDbContext<AppUser, IdentityRole, string>
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Expense> Expenses { get; set; } = null!;
    public DbSet<Income> Incomes { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<AppUser> AppUsers { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<Income>()
        .HasKey(i => i.Id);  // Primärschlüssel für Income (einzelnes Feld)

      builder.Entity<Income>()
        .HasOne(i => i.AppUser)
        .WithMany(u => u.Incomes)
        .HasForeignKey(i => i.AppUserId);

      builder.Entity<Expense>()
        .HasKey(i => i.Id);  // Primärschlüssel für Income (einzelnes Feld)

      builder.Entity<Expense>()
        .HasOne(i => i.AppUser)
        .WithMany(u => u.Expenses)
        .HasForeignKey(i => i.AppUserId);

    }
  }
}
