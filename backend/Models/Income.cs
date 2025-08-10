using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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
    public string AppUserId { get; set; }  // Achtung: IdentityUser.Id ist string

    // navigation property
    public AppUser AppUser { get; set; }
  }
}