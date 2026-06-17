using backend.Data;
using backend.Dtos.Recurring;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [Route("api/recurring")]
  [ApiController]
  public class RecurringTransactionController : ControllerBase
  {
    private readonly AppDbContext _context;

    public RecurringTransactionController(AppDbContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
      var recurringTransactions = await _context.RecurringTransactions
        .Include(r => r.Category)
        .OrderBy(r => r.NextRunDate)
        .Select(r => ToDto(r))
        .ToListAsync();

      return Ok(recurringTransactions);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UpsertRecurringTransactionRequestDto recurringDto)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var categoryExists = await _context.Categories.AnyAsync(c => c.Id == recurringDto.CategoryId);
      if (!categoryExists)
      {
        return BadRequest($"Category with ID {recurringDto.CategoryId} does not exist.");
      }

      var recurring = new RecurringTransaction
      {
        Title = recurringDto.Title,
        Amount = recurringDto.Amount,
        CategoryId = recurringDto.CategoryId,
        Type = recurringDto.Type,
        Frequency = recurringDto.Frequency,
        NextRunDate = recurringDto.NextRunDate,
        IsActive = recurringDto.IsActive,
      };

      await _context.RecurringTransactions.AddAsync(recurring);
      await _context.SaveChangesAsync();
      await _context.Entry(recurring).Reference(r => r.Category).LoadAsync();

      return CreatedAtAction(nameof(GetAll), new { id = recurring.Id }, ToDto(recurring));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpsertRecurringTransactionRequestDto recurringDto)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var recurring = await _context.RecurringTransactions.FirstOrDefaultAsync(r => r.Id == id);
      if (recurring == null)
      {
        return NotFound();
      }

      recurring.Title = recurringDto.Title;
      recurring.Amount = recurringDto.Amount;
      recurring.CategoryId = recurringDto.CategoryId;
      recurring.Type = recurringDto.Type;
      recurring.Frequency = recurringDto.Frequency;
      recurring.NextRunDate = recurringDto.NextRunDate;
      recurring.IsActive = recurringDto.IsActive;

      await _context.SaveChangesAsync();
      await _context.Entry(recurring).Reference(r => r.Category).LoadAsync();

      return Ok(ToDto(recurring));
    }

    [HttpPost("run-due")]
    public async Task<IActionResult> RunDue([FromQuery] DateTime? until = null)
    {
      var cutoff = until ?? DateTime.UtcNow;
      var dueTransactions = await _context.RecurringTransactions
        .Where(r => r.IsActive && r.NextRunDate.Date <= cutoff.Date)
        .ToListAsync();

      var created = 0;

      foreach (var recurring in dueTransactions)
      {
        while (recurring.IsActive && recurring.NextRunDate.Date <= cutoff.Date)
        {
          if (recurring.Type == "income")
          {
            await _context.Incomes.AddAsync(new Income
            {
              Title = recurring.Title,
              Amount = recurring.Amount,
              CategoryId = recurring.CategoryId,
              Date = recurring.NextRunDate,
            });
          }
          else
          {
            await _context.Expenses.AddAsync(new Expense
            {
              Title = recurring.Title,
              Amount = recurring.Amount,
              CategoryId = recurring.CategoryId,
              Date = recurring.NextRunDate,
            });
          }

          created++;
          recurring.LastRunDate = recurring.NextRunDate;
          recurring.NextRunDate = GetNextRunDate(recurring.NextRunDate, recurring.Frequency);
        }
      }

      await _context.SaveChangesAsync();

      return Ok(new { created });
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      var recurring = await _context.RecurringTransactions.FirstOrDefaultAsync(r => r.Id == id);
      if (recurring == null)
      {
        return NotFound();
      }

      _context.RecurringTransactions.Remove(recurring);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private static DateTime GetNextRunDate(DateTime current, string frequency)
    {
      return frequency switch
      {
        "weekly" => current.AddDays(7),
        "yearly" => current.AddYears(1),
        _ => current.AddMonths(1),
      };
    }

    private static RecurringTransactionDto ToDto(RecurringTransaction recurring)
    {
      return new RecurringTransactionDto
      {
        Id = recurring.Id,
        Title = recurring.Title,
        Amount = recurring.Amount,
        CategoryId = recurring.CategoryId,
        CategoryTitle = recurring.Category?.Title ?? string.Empty,
        Type = recurring.Type,
        Frequency = recurring.Frequency,
        NextRunDate = recurring.NextRunDate,
        LastRunDate = recurring.LastRunDate,
        IsActive = recurring.IsActive,
      };
    }
  }
}
