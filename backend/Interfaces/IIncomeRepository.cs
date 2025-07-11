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
    Task<List<Income>> GetAllAsync(QueryObject query);
    Task<Income?> GetbyIdAsync(int id);
    Task<Income> CreateAsync(Income incomemodel);
    Task<Income?> UpdateAsync(int id, UpdateIncomeRequestDto incomeDto);
    Task<Income?> DeleteAsync(int id);
    Task<bool> IncomeExists(int id);
  }
}