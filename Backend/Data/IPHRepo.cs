using PH.Models;
using PH.Dtos;

namespace PH.Data
{
    public interface IPHRepo {
        public IEnumerable<Breed> GetAllAnimals();
        public IEnumerable<Breed> GetSpeciesBreeds(string species);
        public Breed? GetBreed(string species, string breed);
    }
}