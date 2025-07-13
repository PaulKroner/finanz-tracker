using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos.Expense;
using backend.Interfaces;
using backend.Models;
using dotnetTutorial.Helpers;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
  public class ExpenseRepository : IExpenseRepository
  {
    private readonly AppDbContext _context;
    public ExpenseRepository(AppDbContext context)
    {
      _context = context;
    }

    public async Task<Expense> CreateAsync(Expense expenseModel)
    {
      await _context.Expenses.AddAsync(expenseModel);
      await _context.SaveChangesAsync();
      return expenseModel;
    }

    public async Task<Expense?> DeleteAsync(int id)
    {
      var expenseModel = await _context.Expenses.FirstOrDefaultAsync(x => x.Id == id);
      if (expenseModel == null)
      {
        return null;
      }

      _context.Expenses.Remove(expenseModel);
      await _context.SaveChangesAsync();
      return expenseModel;
    }

    public async Task<List<Expense>> GetAllAsync(QueryObject query)
    {
      IQueryable<Expense> expenses = _context.Expenses;

      if (!string.IsNullOrWhiteSpace(query.Title))
      {
        expenses = expenses.Where(s => s.Title.Contains(query.Title));
      }

      if (query.Year.HasValue)
      {
        expenses = expenses.Where(s => s.Date.Year == query.Year.Value);
      }

      if (query.Month.HasValue)
      {
        expenses = expenses.Where(s => s.Date.Month == query.Month.Value);
      }

      var skipNumber = (query.PageNumber - 1) * query.PageSize;

      return await expenses.OrderBy(i => i.Date).Skip(skipNumber).Take(query.PageSize).ToListAsync();
    }

    public async Task<Expense?> GetbyIdAsync(int id)
    {
      return await _context.Expenses.FirstOrDefaultAsync(i => i.Id == id);
    }

    public Task<bool> ExpenseExists(int id)
    {
      return _context.Expenses.AnyAsync(s => s.Id == id);
    }

    public async Task<Expense?> UpdateAsync(int id, UpdateExpenseRequestDto expenseDto)
    {
      var existingExpense = await _context.Expenses.FirstOrDefaultAsync(x => x.Id == id);

      if (existingExpense == null)
      {
        return null;
      }

      existingExpense.Title = expenseDto.Title;
      existingExpense.Amount = expenseDto.Amount;
      existingExpense.Category = expenseDto.Category;
      existingExpense.Date = expenseDto.Date;

      await _context.SaveChangesAsync();
      return existingExpense;
    }
  }
}