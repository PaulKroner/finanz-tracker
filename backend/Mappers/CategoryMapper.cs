using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Category;
using backend.Models;

namespace backend.Mappers
{
  public static class CategoryMapper
  {
    public static CategoryDto ToCategoryDto(this Category categorymodel)
    {
      return new CategoryDto
      {
        Id = categorymodel.Id,
        Title = categorymodel.Title,
      };
    }
    public static Category ToCategoryFromCreateDto(this CreateCategoryRequestDto categoryDto)
    {
      return new Category
      {
        Title = categoryDto.Title,
      };
    }

    public static Category ToCategoryFromUpdate(this UpdateCategoryRequestDto categoryDto)
    {
      return new Category
      {
        Title = categoryDto.Title,
      };
    }
  }
}