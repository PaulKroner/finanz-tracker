using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Category
{
  public class CategoryDto
  {
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Type { get; set; } = "both";
    public string Color { get; set; } = "#64748b";
    public string Icon { get; set; } = "circle";
  }
}
