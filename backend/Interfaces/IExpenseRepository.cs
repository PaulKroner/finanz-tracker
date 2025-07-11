using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Expense;
using backend.Models;
using dotnetTutorial.Helpers;

namespace backend.Interfaces
{
  public interface IExpenseRepository
  {
    Task<List<Expense>> GetAllAsync(QueryObject query);
    Task<Expense?> GetbyIdAsync(int id);
    Task<Expense> CreateAsync(Expense expensemodel);
    Task<Expense?> UpdateAsync(int id, UpdateExpenseRequestDto stockDto);
    Task<Expense?> DeleteAsync(int id);
    Task<bool> ExpenseExists(int id);
  }
}