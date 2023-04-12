using Bank.Model;
using Microsoft.EntityFrameworkCore;
/*
 * In summary, this code snippet defines a DataContext class that represents the database context for the Bank application,
 * with DbSet properties for the entities in the database, and constructors for creating instances of the context
 * with or without connection options.
 * */

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
        public DbSet<History> History { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
