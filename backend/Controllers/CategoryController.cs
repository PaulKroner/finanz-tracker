using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
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
  }
}