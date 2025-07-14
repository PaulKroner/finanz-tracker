using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Category
{
  public class CreateCategoryRequestDto
  {
    [Required]
    [MaxLength(280, ErrorMessage = "Title cannot be over 280 characters!")]
    public string Title { get; set; } = string.Empty;
  }
}