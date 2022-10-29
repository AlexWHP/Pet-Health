using PH.Models;
using PH.Dtos;

namespace PH.Data
{
    public class PHRepo : IPHRepo
    {
        private readonly PHDBContext _dbContext;

        public PHRepo(PHDBContext dbContext) {
            _dbContext = dbContext;
        }
        
        // Returns all of the animals in the database
        public IEnumerable<Breed> GetAllAnimals() {
            return _dbContext.Breeds.ToList<Breed>();
        }
        // Returns the animals of a specifc species
        public IEnumerable<Breed> GetSpeciesBreeds(string species) {
            return GetAllAnimals().Where(animal => animal.species == species);
        }
        // Returns a specific animal based on its species and breed
        public Breed? GetBreed(string species, string breed) {
            return GetSpeciesBreeds(species).FirstOrDefault(animal => animal.breed == breed);
        }
        // Returns the illnesses information from a comma deliminated string of illness names
        public IEnumerable<Illness> GetIllnesses() {
            return _dbContext.Illnesses.ToList<Illness>();
        }
    }
}