using System;
using System.ComponentModel.DataAnnotations;

namespace ContactAPI.Model
{
    public class ContactDetails
    {
        public int Id { get; set; }

        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        [EmailAddress]
        [Required]
        public string? Email { get; set; }

        [Phone]
        public string? Phone { get; set; }

        public string? Address { get; set; }
    }

}