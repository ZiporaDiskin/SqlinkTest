using System.ComponentModel.DataAnnotations;

namespace Test.Models
{
    public class Person
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Score { get; set; }
        public string? Team { get; set; }
        public DateTime JoinAt { get; set; }
        public string? Avatar { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public ICollection<Project>? Projects { get; set; }
    }
}
