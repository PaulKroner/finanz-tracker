using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Income;
using backend.Interfaces;
using backend.Mappers;
using dotnetTutorial.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var incomes = await _incomeRepo.GetAllAsync(query);
      var incomeDto = incomes.Select(s => s.ToIncomeDto());

      return Ok(incomes);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var income = await _incomeRepo.GetbyIdAsync(id);

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

      var incomeModel = incomeDto.ToIncomeFromCreateDto();

      await _incomeRepo.CreateAsync(incomeModel);

      return CreatedAtAction(nameof(GetById), new { id = incomeModel.Id }, incomeModel.ToIncomeDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateIncomeRequestDto updateDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var categoryExists = await _context.Categories.FindAsync(updateDto.CategoryId);
      if (categoryExists == null)
      {
        return BadRequest($"Category with ID {updateDto.CategoryId} does not exist.");
      }

      var incomeModel = await _incomeRepo.UpdateAsync(id, updateDto);

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

      var incomeModel = await _incomeRepo.DeleteAsync(id);

      if (incomeModel == null)
      {
        return NotFound();
      }

      return NoContent();
    }

  }
}