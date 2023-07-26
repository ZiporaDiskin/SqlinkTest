using System.ComponentModel.DataAnnotations;

namespace Test.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? PersonId { get; set; }
        public Person Person { get; set; }
        public int? DurationInDays { get; set; }
        public bool? MadeDadeLine { get; set; }
        public int? bugsCount { get; set; }

        
    }
}
