using Microsoft.EntityFrameworkCore;
using backend.Data;
namespace backend.Endpoints;

public static class ExpenseEndpoints
{
  public static void MapExpenseEndpoints(this IEndpointRouteBuilder app)
  {
    app.MapGet("/api/expense/category-summary", async (int year, int month, AppDbContext db) =>
    {
      var summary = await db.Expenses
              .Where(e => e.Date.Year == year && e.Date.Month == month)
              .GroupBy(e => e.Category!.Title)
              .Select(g => new
              {
                Category = g.Key,
                TotalAmount = g.Sum(e => e.Amount)
              })
              .ToListAsync();

      return Results.Ok(summary);
    })
    .RequireAuthorization()
    .WithTags("Expense"); // Endpoint to get category summary for expenses for swagger
  }
}

