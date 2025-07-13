using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetTutorial.Helpers
{
// hier muss noch mehr passieren, aber vorerst wirds reichen
  public class QueryObject
  {
    public string? Title { get; set; } = null;
    public int? Year { get; set; }
    public string? SortBy { get; set; } = null;
    public bool IsDecending { get; set; } = false;
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
  }
}