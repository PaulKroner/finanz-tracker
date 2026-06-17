using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
  public class RecurringTransaction
  {
    public int Id { get; set; }
    [MaxLength(280)]
    public string Title { get; set; } = string.Empty;
    [Range(0.01, 1000000)]
    public decimal Amount { get; set; }
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    public string Type { get; set; } = "expense";
    public string Frequency { get; set; } = "monthly";
    public DateTime NextRunDate { get; set; }
    public DateTime? LastRunDate { get; set; }
    public bool IsActive { get; set; } = true;
  }
}
