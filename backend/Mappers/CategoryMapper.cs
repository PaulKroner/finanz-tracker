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
        Type = categorymodel.Type,
        Color = categorymodel.Color,
        Icon = categorymodel.Icon,
      };
    }
    public static Category ToCategoryFromCreateDto(this CreateCategoryRequestDto categoryDto)
    {
      return new Category
      {
        Title = categoryDto.Title,
        Type = categoryDto.Type,
        Color = categoryDto.Color,
        Icon = categoryDto.Icon,
      };
    }

    public static Category ToCategoryFromUpdate(this UpdateCategoryRequestDto categoryDto)
    {
      return new Category
      {
        Title = categoryDto.Title,
        Type = categoryDto.Type,
        Color = categoryDto.Color,
        Icon = categoryDto.Icon,
      };
    }
  }
}
