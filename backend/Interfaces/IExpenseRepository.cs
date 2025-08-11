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
    Task<List<Expense>> GetAllAsync(QueryObject query, string email);
    Task<Expense?> GetbyIdAsync(int id, string email);
    Task<Expense> CreateAsync(Expense expensemodel);
    Task<Expense?> UpdateAsync(int id, UpdateExpenseRequestDto stockDto, string email);
    Task<Expense?> DeleteAsync(int id, string email);
    Task<bool> ExpenseExists(int id);
  }
}