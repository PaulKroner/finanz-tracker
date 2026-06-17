using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
  public class Budget
  {
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    [Range(1, 9999)]
    public int Year { get; set; }
    [Range(1, 12)]
    public int Month { get; set; }
    [Range(0.01, 1000000)]
    public decimal Amount { get; set; }
  }
}
