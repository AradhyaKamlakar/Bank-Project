using Bank.Model;
using Microsoft.EntityFrameworkCore;

namespace Bank.Data
{
    public class DataContext: DbContext
    {
        public DataContext() : base()
        {

            Console.WriteLine("Connection Established");
        }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Token> Tokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
