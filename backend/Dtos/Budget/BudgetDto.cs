namespace backend.Dtos.Budget
{
  public class BudgetDto
  {
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string CategoryTitle { get; set; } = string.Empty;
    public string CategoryColor { get; set; } = "#64748b";
    public int Year { get; set; }
    public int Month { get; set; }
    public decimal Amount { get; set; }
    public decimal Spent { get; set; }
    public decimal Remaining { get; set; }
    public decimal UsagePercent { get; set; }
  }
}
