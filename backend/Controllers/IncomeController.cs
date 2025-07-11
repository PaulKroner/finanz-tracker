using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Income;
using backend.Interfaces;
using backend.Mappers;
using dotnetTutorial.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
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

      var stocks = await _incomeRepo.GetAllAsync(query);
      var stockDto = stocks.Select(s => s.ToIncomeDto());

      return Ok(stocks);
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

      var incomeModel = incomeDto.ToIncomeFromCreateDto();

      await _incomeRepo.CreateAsync(incomeModel);

      return CreatedAtAction(nameof(GetById), new { id = incomeModel.Id }, incomeModel.ToIncomeDto());
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateIncomeRequestDto updateDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var incomeModel = await _incomeRepo.UpdateAsync(id, updateDto);

      if (incomeModel == null)
      {
        return NotFound();
      }

      return Ok(incomeModel.ToIncomeDto());
    }

    [HttpDelete]
    [Route("id:int")]
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