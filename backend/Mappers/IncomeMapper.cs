using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Income;
using backend.Models;
using Npgsql.Replication;

namespace backend.Mappers
{
  public static class IncomeMapper
  {
    public static IncomeDto ToIncomeDto(this Income incomemodel)
    {
      return new IncomeDto
      {
        Id = incomemodel.Id,
        Title = incomemodel.Title,
        Amount = incomemodel.Amount,
        Category = incomemodel.Category,
        Date = incomemodel.Date,
      };
    }

    public static Income ToIncomeFromCreateDto(this CreateIncomeRequestDto incomeDto)
    {
      return new Income
      {
        Title = incomeDto.Title,
        Amount = incomeDto.Amount,
        Category = incomeDto.Category,
        Date = incomeDto.Date
      };
    }

    public static Income ToIncomeFromUpdate(this UpdateIncomeRequestDto incomeDto)
    {
      return new Income
      {
        Title = incomeDto.Title,
        Amount = incomeDto.Amount,
        Category = incomeDto.Category,
        Date = incomeDto.Date
      };
    }
  }
}