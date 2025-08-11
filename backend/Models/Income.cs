using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
  public class Income
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    // foreign key
    public int CategoryId { get; set; }
    // navigation property
    public Category? Category { get; set; }
    public DateTime Date { get; set; }
    // foreign key for User
    public string AppUserId { get; set; }

    // navigation property
    public AppUser AppUser { get; set; }
  }
}