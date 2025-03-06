using System;
using ContactAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace ContactAPI.Data
{
    public class ContactDbContext : DbContext
    {
        public ContactDbContext(DbContextOptions<ContactDbContext> options) : base(options) {}

        public DbSet<ContactDetails> Contacts{get; set;}
    }
}
