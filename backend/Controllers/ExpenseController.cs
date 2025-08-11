using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.Data;
using backend.Dtos.Expense;
using backend.Interfaces;
using backend.Mappers;
using dotnetTutorial.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [Authorize]
  [Route("api/expense")]
  [ApiController]
  public class ExpenseController : ControllerBase
  {
    private readonly AppDbContext _context;
    private readonly IExpenseRepository _expenseRepo;

    public ExpenseController(AppDbContext context, IExpenseRepository expenseRepo)
    {
      _expenseRepo = expenseRepo;
      _context = context;
    }

    private string GetUserEmail()
    {

      // hier scheint es ein Problem zu geben. irgendein claim ist falsch
      return User.FindFirst(ClaimTypes.Email)?.Value
        ?? User.FindFirst("email")?.Value
        ?? User.FindFirst(JwtRegisteredClaimNames.Email)?.Value;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var userEmail = GetUserEmail();
      if (string.IsNullOrEmpty(userEmail))
        return Unauthorized();

      var expenses = await _expenseRepo.GetAllAsync(query, userEmail);
      var expenseDto = expenses.Select(s => s.ToExpenseDto());

      return Ok(expenseDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var userEmail = GetUserEmail();
      if (string.IsNullOrEmpty(userEmail))
        return Unauthorized();

      var expense = await _expenseRepo.GetbyIdAsync(id, userEmail);

      if (expense == null)
      {
        return NotFound();
      }

      return Ok(expense.ToExpenseDto);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateExpenseRequestDto expenseDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var categoryExists = await _context.Categories.FindAsync(expenseDto.CategoryId);
      if (categoryExists == null)
      {
        return BadRequest($"Category with ID {expenseDto.CategoryId} does not exist.");
      }

      var userEmail = GetUserEmail();
      if (string.IsNullOrEmpty(userEmail))
        return Unauthorized("Could not identify user from token.");

      var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
      if (user == null)
        return Unauthorized("User not found.");

      var expenseModel = expenseDto.ToExpenseFromCreateDto();
      expenseModel.AppUserId = user.Id;

      await _expenseRepo.CreateAsync(expenseModel);

      return CreatedAtAction(nameof(GetById), new { id = expenseModel.Id }, expenseModel.ToExpenseDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExpenseRequestDto updateDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var userEmail = GetUserEmail();
      if (string.IsNullOrEmpty(userEmail))
        return Unauthorized();

      var categoryExists = await _context.Categories.FindAsync(updateDto.CategoryId);
      if (categoryExists == null)
      {
        return BadRequest($"Category with ID {updateDto.CategoryId} does not exist.");
      }

      var expenseModel = await _expenseRepo.UpdateAsync(id, updateDto, userEmail);

      if (expenseModel == null)
      {
        return NotFound();
      }

      return Ok(expenseModel.ToExpenseDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var userEmail = GetUserEmail();
      if (string.IsNullOrEmpty(userEmail))
        return Unauthorized();

      var expenseModel = await _expenseRepo.DeleteAsync(id, userEmail);

      if (expenseModel == null)
      {
        return NotFound();
      }

      return NoContent();
    }

  }
}