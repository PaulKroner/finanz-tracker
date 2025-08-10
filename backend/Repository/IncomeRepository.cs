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

    public async Task<Income?> DeleteAsync(int id, string email)
    {
      var incomeModel = await _context.Incomes
             .Include(i => i.AppUser)
             .FirstOrDefaultAsync(x => x.Id == id && x.AppUser.Email == email);
      if (incomeModel == null)
      {
        return null;
      }

      _context.Incomes.Remove(incomeModel);
      await _context.SaveChangesAsync();
      return incomeModel;
    }

    public async Task<List<Income>> GetAllAsync(QueryObject query, string email)
    {
      IQueryable<Income> incomes = _context.Incomes.Include(i => i.AppUser);

      if (!string.IsNullOrWhiteSpace(email))
      {
        incomes = incomes.Where(s => s.AppUser.Email == email);
      }
      if (!string.IsNullOrWhiteSpace(query.Title))
      {
        incomes = incomes.Where(s => s.Title.Contains(query.Title));
      }

      if (query.Year.HasValue)
      {
        incomes = incomes.Where(s => s.Date.Year == query.Year.Value);
      }

      if (query.Month.HasValue)
      {
        incomes = incomes.Where(s => s.Date.Month == query.Month.Value);
      }

      var skipNumber = (query.PageNumber - 1) * query.PageSize;

      return await incomes.OrderBy(i => i.Date).Skip(skipNumber).Take(query.PageSize).ToListAsync();
    }

    public async Task<Income?> GetbyIdAsync(int id, string email)
    {
      return await _context.Incomes
         .Include(i => i.AppUser)
         .FirstOrDefaultAsync(i => i.Id == id && i.AppUser.Email == email);
    }

    public Task<bool> IncomeExists(int id)
    {
      return _context.Incomes.AnyAsync(s => s.Id == id);
    }

    public async Task<Income?> UpdateAsync(int id, UpdateIncomeRequestDto incomeDto, string email)
    {
      var existingIncome = await _context.Incomes
              .Include(i => i.AppUser)
              .FirstOrDefaultAsync(x => x.Id == id && x.AppUser.Email == email);

      if (existingIncome == null)
      {
        return null;
      }

      existingIncome.Title = incomeDto.Title;
      existingIncome.Amount = incomeDto.Amount;
      existingIncome.CategoryId = incomeDto.CategoryId;
      existingIncome.Date = incomeDto.Date;

      await _context.SaveChangesAsync();
      return existingIncome;
    }
  }
}