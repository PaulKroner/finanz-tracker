using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Income;
using backend.Models;
using dotnetTutorial.Helpers;

namespace backend.Interfaces
{
  public interface IIncomeRepository
  {
    Task<List<Income>> GetAllAsync(QueryObject query, string email);
    Task<Income?> GetbyIdAsync(int id, string email);
    Task<Income> CreateAsync(Income incomemodel);
    Task<Income?> UpdateAsync(int id, UpdateIncomeRequestDto incomeDto, string email);
    Task<Income?> DeleteAsync(int id, string email);
    Task<bool> IncomeExists(int id);
  }
}