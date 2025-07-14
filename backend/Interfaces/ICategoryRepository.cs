using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Category;
using backend.Models;

namespace backend.Interfaces
{
  public interface ICategoryRepository
  {
    Task<List<Category>> GetAllAsync(string title);
    Task<Category?> GetbyIdAsync(int id);
    Task<Category> CreateAsync(Category categorymodel);
    Task<Category?> UpdateAsync(int id, UpdateCategoryRequestDto categoryDto);
    Task<Category?> DeleteAsync(int id);
    Task<bool> CategoryExists(int id);
  }
}