using System.Globalization;
using System.Text;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [Route("api/finance-file")]
  [ApiController]
  public class FinanceFileController : ControllerBase
  {
    private readonly AppDbContext _context;

    public FinanceFileController(AppDbContext context)
    {
      _context = context;
    }

    [HttpGet("export")]
    public async Task<IActionResult> Export([FromQuery] int? year, [FromQuery] int? month)
    {
      var incomeQuery = _context.Incomes.AsQueryable();
      var expenseQuery = _context.Expenses.AsQueryable();

      if (year.HasValue)
      {
        incomeQuery = incomeQuery.Where(i => i.Date.Year == year.Value);
        expenseQuery = expenseQuery.Where(e => e.Date.Year == year.Value);
      }

      if (month.HasValue)
      {
        incomeQuery = incomeQuery.Where(i => i.Date.Month == month.Value);
        expenseQuery = expenseQuery.Where(e => e.Date.Month == month.Value);
      }

      var incomes = await incomeQuery.ToListAsync();
      var expenses = await expenseQuery.ToListAsync();

      var csv = new StringBuilder();
      csv.AppendLine("type,title,amount,categoryId,date");

      foreach (var income in incomes)
      {
        csv.AppendLine(ToCsvLine("income", income.Title, income.Amount, income.CategoryId, income.Date));
      }

      foreach (var expense in expenses)
      {
        csv.AppendLine(ToCsvLine("expense", expense.Title, expense.Amount, expense.CategoryId, expense.Date));
      }

      return File(Encoding.UTF8.GetBytes(csv.ToString()), "text/csv", "finanztracker-export.csv");
    }

    [HttpPost("import")]
    public async Task<IActionResult> Import(IFormFile file)
    {
      if (file.Length == 0)
      {
        return BadRequest("CSV file is empty.");
      }

      var imported = 0;
      using var reader = new StreamReader(file.OpenReadStream());
      var header = await reader.ReadLineAsync();

      if (header == null || !header.Equals("type,title,amount,categoryId,date", StringComparison.OrdinalIgnoreCase))
      {
        return BadRequest("Expected CSV header: type,title,amount,categoryId,date");
      }

      while (!reader.EndOfStream)
      {
        var line = await reader.ReadLineAsync();
        if (string.IsNullOrWhiteSpace(line))
        {
          continue;
        }

        var columns = ParseCsvLine(line);
        if (columns.Count != 5)
        {
          return BadRequest($"Invalid CSV line: {line}");
        }

        var type = columns[0].Trim().ToLowerInvariant();
        var title = columns[1].Trim();
        var amount = decimal.Parse(columns[2], CultureInfo.InvariantCulture);
        var categoryId = int.Parse(columns[3], CultureInfo.InvariantCulture);
        var date = DateTime.Parse(columns[4], CultureInfo.InvariantCulture);

        var categoryExists = await _context.Categories.AnyAsync(c => c.Id == categoryId);
        if (!categoryExists)
        {
          return BadRequest($"Category with ID {categoryId} does not exist.");
        }

        if (type == "income")
        {
          await _context.Incomes.AddAsync(new Income { Title = title, Amount = amount, CategoryId = categoryId, Date = date });
        }
        else if (type == "expense")
        {
          await _context.Expenses.AddAsync(new Expense { Title = title, Amount = amount, CategoryId = categoryId, Date = date });
        }
        else
        {
          return BadRequest($"Unknown transaction type: {type}");
        }

        imported++;
      }

      await _context.SaveChangesAsync();

      return Ok(new { imported });
    }

    private static string ToCsvLine(string type, string title, decimal amount, int categoryId, DateTime date)
    {
      return string.Join(",", type, Escape(title), amount.ToString(CultureInfo.InvariantCulture), categoryId, date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture));
    }

    private static string Escape(string value)
    {
      return value.Contains(',') || value.Contains('"') ? $"\"{value.Replace("\"", "\"\"")}\"" : value;
    }

    private static List<string> ParseCsvLine(string line)
    {
      var result = new List<string>();
      var current = new StringBuilder();
      var inQuotes = false;

      for (var i = 0; i < line.Length; i++)
      {
        var character = line[i];
        if (character == '"' && inQuotes && i + 1 < line.Length && line[i + 1] == '"')
        {
          current.Append('"');
          i++;
        }
        else if (character == '"')
        {
          inQuotes = !inQuotes;
        }
        else if (character == ',' && !inQuotes)
        {
          result.Add(current.ToString());
          current.Clear();
        }
        else
        {
          current.Append(character);
        }
      }

      result.Add(current.ToString());
      return result;
    }
  }
}
