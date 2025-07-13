using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Expense;
using backend.Interfaces;
using backend.Mappers;
using dotnetTutorial.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
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

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var expenses = await _expenseRepo.GetAllAsync(query);
      var expenseDto = expenses.Select(s => s.ToExpenseDto());

      return Ok(expenses);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var expense = await _expenseRepo.GetbyIdAsync(id);

      if (expense == null)
      {
        return NotFound();
      }

      return Ok(expense);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateExpenseRequestDto expenseDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var expenseModel = expenseDto.ToExpenseFromCreateDto();

      await _expenseRepo.CreateAsync(expenseModel);

      return CreatedAtAction(nameof(GetById), new { id = expenseModel.Id }, expenseModel.ToExpenseDto());
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExpenseRequestDto updateDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var expenseModel = await _expenseRepo.UpdateAsync(id, updateDto);

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

      var expenseModel = await _expenseRepo.DeleteAsync(id);

      if (expenseModel == null)
      {
        return NotFound();
      }

      return NoContent();
    }

  }
}