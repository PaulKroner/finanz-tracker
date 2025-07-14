using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Category;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
  [Route("api/category")]
  [ApiController]
  public class CategoryController : ControllerBase
  {
    private readonly AppDbContext _context;
    private readonly ICategoryRepository _categoryRepo;

    public CategoryController(AppDbContext context, ICategoryRepository categoryRepo)
    {
      _context = context;
      _categoryRepo = categoryRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? title)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var categories = await _categoryRepo.GetAllAsync(title);
      var categoryDto = categories.Select(s => s.ToCategoryDto());

      return Ok(categories);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var category = await _categoryRepo.GetbyIdAsync(id);

      if (category == null)
      {
        return NotFound();
      }

      return Ok(category);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCategoryRequestDto categoryDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var categoryModel = categoryDto.ToCategoryFromCreateDto();

      await _categoryRepo.CreateAsync(categoryModel);

      return CreatedAtAction(nameof(GetById), new { id = categoryModel.Id }, categoryModel.ToCategoryDto());
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCategoryRequestDto categoryDto)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var categoryModel = await _categoryRepo.UpdateAsync(id, categoryDto);

      if (categoryModel == null)
      {
        return NotFound();
      }

      return Ok(categoryModel.ToCategoryDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      var categoryModel = await _categoryRepo.DeleteAsync(id);

      if (categoryModel == null)
      {
        return NotFound();
      }

      return NoContent();
    }
  }
}