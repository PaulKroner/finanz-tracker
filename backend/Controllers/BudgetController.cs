using backend.Data;
using backend.Dtos.Budget;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [Route("api/budget")]
  [ApiController]
  public class BudgetController : ControllerBase
  {
    private readonly AppDbContext _context;

    public BudgetController(AppDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int? year, [FromQuery] int? month)
    {
      var budgets = _context.Budgets.Include(b => b.Category).AsQueryable();

      if (year.HasValue)
      {
        budgets = budgets.Where(b => b.Year == year.Value);
      }

      if (month.HasValue)
      {
        budgets = budgets.Where(b => b.Month == month.Value);
      }

      var budgetList = await budgets.OrderBy(b => b.Year).ThenBy(b => b.Month).ToListAsync();
      var result = new List<BudgetDto>();

      foreach (var budget in budgetList)
      {
        var spent = await _context.Expenses
          .Where(e => e.CategoryId == budget.CategoryId && e.Date.Year == budget.Year && e.Date.Month == budget.Month)
          .SumAsync(e => e.Amount);

        result.Add(ToDto(budget, spent));
      }

      return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Upsert([FromBody] UpsertBudgetRequestDto budgetDto)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var categoryExists = await _context.Categories.AnyAsync(c => c.Id == budgetDto.CategoryId);
      if (!categoryExists)
      {
        return BadRequest($"Category with ID {budgetDto.CategoryId} does not exist.");
      }

      var existingBudget = await _context.Budgets.FirstOrDefaultAsync(b =>
        b.CategoryId == budgetDto.CategoryId && b.Year == budgetDto.Year && b.Month == budgetDto.Month);

      if (existingBudget == null)
      {
        existingBudget = new Budget
        {
          CategoryId = budgetDto.CategoryId,
          Year = budgetDto.Year,
          Month = budgetDto.Month,
          Amount = budgetDto.Amount,
        };
        await _context.Budgets.AddAsync(existingBudget);
      }
      else
      {
        existingBudget.Amount = budgetDto.Amount;
      }

      await _context.SaveChangesAsync();
      await _context.Entry(existingBudget).Reference(b => b.Category).LoadAsync();

      var spent = await _context.Expenses
        .Where(e => e.CategoryId == existingBudget.CategoryId && e.Date.Year == existingBudget.Year && e.Date.Month == existingBudget.Month)
        .SumAsync(e => e.Amount);

      return Ok(ToDto(existingBudget, spent));
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      var budget = await _context.Budgets.FirstOrDefaultAsync(b => b.Id == id);
      if (budget == null)
      {
        return NotFound();
      }

      _context.Budgets.Remove(budget);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private static BudgetDto ToDto(Budget budget, decimal spent)
    {
      var remaining = budget.Amount - spent;
      var usagePercent = budget.Amount <= 0 ? 0 : Math.Round(spent / budget.Amount * 100, 2);

      return new BudgetDto
      {
        Id = budget.Id,
        CategoryId = budget.CategoryId,
        CategoryTitle = budget.Category?.Title ?? string.Empty,
        CategoryColor = budget.Category?.Color ?? "#64748b",
        Year = budget.Year,
        Month = budget.Month,
        Amount = budget.Amount,
        Spent = spent,
        Remaining = remaining,
        UsagePercent = usagePercent,
      };
    }
  }
}
