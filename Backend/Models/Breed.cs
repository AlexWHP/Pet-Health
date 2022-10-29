using System.ComponentModel.DataAnnotations;

namespace PH.Models
{
    public class Breed
    { 
        public string? species { get; set; } 
        [Key]
        public string? breed { get; set; } 
        public string? facts { get; set; }
        public string? illnesses { get; set; } 
    }
}