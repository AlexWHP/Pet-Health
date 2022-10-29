using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

using PH.Data;
using PH.Models;
using PH.Dtos;

namespace PH.Controllers
{
    [Route("api")]
    [ApiController]
    public class DataController : Controller {

        private readonly IPHRepo _repository;
        
        public DataController(IPHRepo repository) {
            _repository = repository;
        }
        
        // GET /api/AllAnimals
        [HttpGet("AllAnimals")]
        public ActionResult AllAnimals() {
            IEnumerable<Breed> breeds = _repository.GetAllAnimals();
            return Ok(breeds);
        }

        // GET /api/AllBreeds?species=
        [HttpGet("AllBreeds")]
        public ActionResult AllSpeciesBreeds([Required] string species) {
            IEnumerable<Breed> breeds = _repository.GetSpeciesBreeds(species);
            return Ok(breeds);
        }

        // GET /api/BreedNames?species=
        [HttpGet("BreedNames")]
        public ActionResult BreedNames([Required] string species) {
            IEnumerable<Breed> breeds = _repository.GetSpeciesBreeds(species);
            string names = "";
            foreach(Breed item in breeds) {
                names += item.breed + ",";
            }
            names = names.Substring(0, names.Length - 1);
            return Ok(names);
        }

        // GET /api/BreedInfo?species=?breed=
        [HttpGet("BreedInfo")]
        public ActionResult BreedInfo([Required] string species, [Required] string breed) {
            Breed? breed_info = _repository.GetBreed(species, breed);
            if (breed_info != null) {return Ok(breed_info);};
            return NotFound("Not in DB");
        }

        // POST /api/PetDetails
        [HttpPost("PetDetails")]
        public ActionResult PetDetails(PetDetailsInputDto p) {
            return Ok(p);
        }
    }
}
