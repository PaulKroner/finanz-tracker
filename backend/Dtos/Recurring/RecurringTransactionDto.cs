namespace backend.Dtos.Recurring
{
  public class RecurringTransactionDto
  {
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public int CategoryId { get; set; }
    public string CategoryTitle { get; set; } = string.Empty;
    public string Type { get; set; } = "expense";
    public string Frequency { get; set; } = "monthly";
    public DateTime NextRunDate { get; set; }
    public DateTime? LastRunDate { get; set; }
    public bool IsActive { get; set; }
  }
}
