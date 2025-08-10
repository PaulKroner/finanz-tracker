using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.Data;
using backend.Dtos.Income;
using backend.Interfaces;
using backend.Mappers;
using dotnetTutorial.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
  [Authorize]
  [Route("api/income")]
  [ApiController]
  public class IncomeController : ControllerBase
  {
    private readonly AppDbContext _context;
    private readonly IIncomeRepository _incomeRepo;

    public IncomeController(AppDbContext context, IIncomeRepository incomeRepo)
    {
      _incomeRepo = incomeRepo;
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

      var incomes = await _incomeRepo.GetAllAsync(query, userEmail);
      var incomeDto = incomes.Select(s => s.ToIncomeDto());

      return Ok(incomeDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var userEmail = GetUserEmail();
      if (string.IsNullOrEmpty(userEmail))
        return Unauthorized();

      var income = await _incomeRepo.GetbyIdAsync(id, userEmail);

      if (income == null)
      {
        return NotFound();
      }

      return Ok(income);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateIncomeRequestDto incomeDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var categoryExists = await _context.Categories.FindAsync(incomeDto.CategoryId);
      if (categoryExists == null)
      {
        return BadRequest($"Category with ID {incomeDto.CategoryId} does not exist.");
      }

      var userEmail = GetUserEmail();
      if (string.IsNullOrEmpty(userEmail))
        return Unauthorized("Could not identify user from token.");

      var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
      if (user == null)
        return Unauthorized("User not found.");

      var incomeModel = incomeDto.ToIncomeFromCreateDto();
      incomeModel.AppUserId = user.Id;

      await _incomeRepo.CreateAsync(incomeModel);

      return CreatedAtAction(nameof(GetById), new { id = incomeModel.Id }, incomeModel.ToIncomeDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateIncomeRequestDto updateDto)
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

      var incomeModel = await _incomeRepo.UpdateAsync(id, updateDto, userEmail);

      if (incomeModel == null)
      {
        return NotFound();
      }

      return Ok(incomeModel.ToIncomeDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var userEmail = GetUserEmail();
      if (string.IsNullOrEmpty(userEmail))
        return Unauthorized();

      var incomeModel = await _incomeRepo.DeleteAsync(id, userEmail);

      if (incomeModel == null)
      {
        return NotFound();
      }

      return NoContent();
    }

  }
}