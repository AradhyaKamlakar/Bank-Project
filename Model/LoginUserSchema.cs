using System.ComponentModel.DataAnnotations;

namespace Bank.Model
{
    public class UserLoginSchema
    {
        public int id { get; set; }
        public string name { get; set; }
        public string password { get; set; }
        public string accountNumber { get; set; }
        public string role { get; set; }

    }
}
