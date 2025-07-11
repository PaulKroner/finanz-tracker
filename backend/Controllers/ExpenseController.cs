using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ExpenseController : ControllerBase
  {
    // private readonly Data.DbContext _context;

    // public ExpenseController(Data.DbContext context)
    // {
    //     _context = context;
    // }

    // [HttpGet("getAllExpenses")]
    // public async Task<ActionResult<IEnumerable<Expense>>> GetAllExpenses()
    // {
    //     var expenses = await _context.Expenses.ToListAsync();
    //     return Ok(expenses);
    // }

    [HttpGet("getAllExpenses")]
    public IActionResult GetAllExpenses()
    {
      return Ok(new { message = "Dies ist eine Beispielantwort ohne Datenbankverbindung." });
    }
  }
}
