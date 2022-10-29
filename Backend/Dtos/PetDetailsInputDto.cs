namespace PH.Dtos
{
    // For later usage with registering pets and their weights
    public class PetDetailsInputDto
    {
        public string? species { get; set; } 
        public string? breed { get; set; } 
        public string? weight { get; set; } 
        public string? age { get; set; } 
        public string? sex { get; set; } 
    }
}