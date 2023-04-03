using System.ComponentModel.DataAnnotations;

namespace Bank.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string Password { get; set; }
        [Required]
        [StringLength(10)]
        public string AccountNumber { get; set; }
        public string Role { get; set; }
        
    }
}
