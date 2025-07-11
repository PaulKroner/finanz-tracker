using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Expense;
using backend.Models;

namespace backend.Mappers
{
  public static class ExpanseMapper
  {
    public static ExpenseDto ToExpenseDto(this Expense expensemodel)
    {
      return new ExpenseDto
      {
        Id = expensemodel.Id,
        Title = expensemodel.Title,
        Amount = expensemodel.Amount,
        Category = expensemodel.Category,
        Date = expensemodel.Date,
      };
    }

    public static Expense ToExpenseFromCreateDto(this CreateExpenseRequestDto expenseDto)
    {
      return new Expense
      {
        Title = expenseDto.Title,
        Amount = expenseDto.Amount,
        Category = expenseDto.Category,
        Date = expenseDto.Date
      };
    }

    public static Expense ToExpenseFromUpdate(this UpdateExpenseRequestDto expenseDto)
    {
      return new Expense
      {
        Title = expenseDto.Title,
        Amount = expenseDto.Amount,
        Category = expenseDto.Category,
        Date = expenseDto.Date
      };
    }
  }
}