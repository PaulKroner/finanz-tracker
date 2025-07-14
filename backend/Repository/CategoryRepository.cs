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

    public Task<bool> CategoryExists(int id)
    {
      return _context.Categories.AnyAsync(c => c.Id == id);
    }

    public async Task<Category> CreateAsync(Category categorymodel)
    {
      await _context.Categories.AddAsync(categorymodel);
      await _context.SaveChangesAsync();
      return categorymodel;
    }

    public async Task<Category?> DeleteAsync(int id)
    {
      var categoryModel = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);
      if (categoryModel == null)
      {
        return null;
      }

      _context.Categories.Remove(categoryModel);
      await _context.SaveChangesAsync();
      return categoryModel;
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

    public async Task<Category?> GetbyIdAsync(int id)
    {
      return await _context.Categories.FirstOrDefaultAsync(i => i.Id == id);
    }

    public async Task<Category?> UpdateAsync(int id, UpdateCategoryRequestDto categoryDto)
    {
      var existingCategory = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);

      if (existingCategory == null)
      {
        return null;
      }

      existingCategory.Title = categoryDto.Title;

      await _context.SaveChangesAsync();
      return existingCategory;
    }
  }
}