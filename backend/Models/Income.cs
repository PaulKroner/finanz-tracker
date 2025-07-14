using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
  public class Income
  {
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    // foreign key
    public int CategoryId { get; set; }
    // navigation property
    public Category? Category { get; set; }
    public DateTime Date { get; set; }
  }
}