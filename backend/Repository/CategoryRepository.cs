using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Category;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
  public class CategoryRepository : ICategoryRepository
  {
    private readonly AppDbContext _context;
    public CategoryRepository(AppDbContext context)
    {
      _context = context;
    }

    public async Task<List<Category>> GetAllAsync(string? title)
    {
      IQueryable<Category> query = _context.Categories;

      if (!string.IsNullOrWhiteSpace(title))
      {
        query = query.Where(c => c.Title.Contains(title));
      }

      return await query.ToListAsync();
    }
  }
}