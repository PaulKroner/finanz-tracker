using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Income;
using backend.Interfaces;
using backend.Models;
using dotnetTutorial.Helpers;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
  public class IncomeRepository : IIncomeRepository
  {
    private readonly AppDbContext _context;
    public IncomeRepository(AppDbContext context)
    {
      _context = context;
    }

    public async Task<Income> CreateAsync(Income incomeModel)
    {
      await _context.Incomes.AddAsync(incomeModel);
      await _context.SaveChangesAsync();
      return incomeModel;
    }

    public async Task<Income?> DeleteAsync(int id)
    {
      var incomeModel = await _context.Incomes.FirstOrDefaultAsync(x => x.Id == id);
      if (incomeModel == null)
      {
        return null;
      }

      _context.Incomes.Remove(incomeModel);
      await _context.SaveChangesAsync();
      return incomeModel;
    }

    public async Task<List<Income>> GetAllAsync(QueryObject query)
    {
      IQueryable<Income> incomes = _context.Incomes;

      if (!string.IsNullOrWhiteSpace(query.Title))
      {
        incomes = incomes.Where(s => s.Title.Contains(query.Title));
      }

      if (query.Year.HasValue)
      {
        incomes = incomes.Where(s => s.Date.Year == query.Year.Value);
      }

      var skipNumber = (query.PageNumber - 1) * query.PageSize;

      return await incomes.Skip(skipNumber).Take(query.PageSize).ToListAsync();
    }

    public async Task<Income?> GetbyIdAsync(int id)
    {
      return await _context.Incomes.FirstOrDefaultAsync(i => i.Id == id);
    }

    public Task<bool> IncomeExists(int id)
    {
      return _context.Incomes.AnyAsync(s => s.Id == id);
    }

    public async Task<Income?> UpdateAsync(int id, UpdateIncomeRequestDto incomeDto)
    {
      var existingIncome = await _context.Incomes.FirstOrDefaultAsync(x => x.Id == id);

      if (existingIncome == null)
      {
        return null;
      }

      existingIncome.Title = incomeDto.Title;
      existingIncome.Amount = incomeDto.Amount;
      existingIncome.Category = incomeDto.Category;
      existingIncome.Date = incomeDto.Date;

      await _context.SaveChangesAsync();
      return existingIncome;
    }
  }
}