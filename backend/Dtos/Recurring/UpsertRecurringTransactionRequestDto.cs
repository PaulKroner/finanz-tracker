using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Recurring
{
  public class UpsertRecurringTransactionRequestDto
  {
    [Required]
    [MaxLength(280)]
    public string Title { get; set; } = string.Empty;
    [Range(0.01, 1000000)]
    public decimal Amount { get; set; }
    [Required]
    public int CategoryId { get; set; }
    [RegularExpression("income|expense")]
    public string Type { get; set; } = "expense";
    [RegularExpression("weekly|monthly|yearly")]
    public string Frequency { get; set; } = "monthly";
    public DateTime NextRunDate { get; set; }
    public bool IsActive { get; set; } = true;
  }
}
