using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Expense
{
  public class CreateExpenseRequestDto
  {
    [Required]
    [MaxLength(280, ErrorMessage = "Title cannot be over 280 characters!")]
    public string Title { get; set; } = string.Empty;
    [Required]
    [Range(0.5, 1000000)]
    public decimal Amount { get; set; }
    [Required]
    public int CategoryId { get; set; }
    [Required]
    public DateTime Date { get; set; }
  }
}