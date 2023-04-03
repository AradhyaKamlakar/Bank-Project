using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bank.Model
{
    public class Token
    {
        [Key]
        public int TokenId { get; set; }
        public int TokenNumber { get; set; }
        [Required]
        [StringLength(100)]
        public string ServiceName { get; set; }
        public int Status { get; set; }
        public int WaitingTime { get; set; }
        public int NoShowCount { get; set; }
        public DateTime TokenGenerationTime { get; set; }
        public int UserId { get; set; }
        [ForeignKey("Id")]
        public virtual User users { get; set; }
    }
}
