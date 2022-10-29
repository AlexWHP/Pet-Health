using System.ComponentModel.DataAnnotations;

namespace PH.Models
{
    public class Illness
    { 
        [Key]
        public string? name { get; set; } 
        public string? description { get; set; } 
        public string? symptoms { get; set; } 
        public string? advice { get; set; } 
    }
}