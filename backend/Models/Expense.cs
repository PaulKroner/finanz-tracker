namespace backend.Models
{
  public class Expense
  {
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Category { get; set; } = string.Empty;
    public int Year { get; set; }
    public int Month { get; set; }
    public int Day { get; set; }
    public string Type { get; set; } = string.Empty; // Einnahme/Ausgabe
  }
}
