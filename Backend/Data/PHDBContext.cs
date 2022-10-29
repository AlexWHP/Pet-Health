using Microsoft.EntityFrameworkCore;

using PH.Models;

namespace PH.Data
{
    public class PHDBContext : DbContext
    { 
        public PHDBContext(DbContextOptions<PHDBContext> options) : base(options) { }
        public DbSet<Breed> Breeds { get; set; }
        public DbSet<Illness> Illnesses { get; set; }
    }
}