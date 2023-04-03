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

            modelBuilder.Entity<Token>()
                .HasOne(v => v.users)
                .WithMany(v => v.Tokens)
                .HasForeignKey(v => v.UserId);



            base.OnModelCreating(modelBuilder);
        }
    }
}
