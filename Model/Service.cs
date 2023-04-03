using System.ComponentModel.DataAnnotations;

namespace Bank.Model
{
    public class Service
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string ServiceName { get; set; }
        [Required]
        public int ServiceTime { get; set; }
    }
}
