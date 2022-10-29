using System.ComponentModel.DataAnnotations;

namespace PH.Models
{
    // For later usage with registering pets and their weights
    public class PetDetails
    {
        [Key]
        public int id { get; set; } 
        public string? species { get; set; } 
        public string? breed { get; set; } 
        public string? weights { get; set; } 
        public string? current_weight { get; set; } 
        public string? age { get; set; } 
        public string? sex { get; set; } 
    }
}