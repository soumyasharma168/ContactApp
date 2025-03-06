using ContactAPI.Data;
using ContactAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactAPI.Controller
{
    [Route("api/contact")]
    [ApiController]
    public class ContactController : ControllerBase
    {

        private readonly ContactDbContext _context;

        public ContactController(ContactDbContext context)
        {
            _context = context;
        }

        //get: api/contact
        [HttpGet]
        public  async Task<ActionResult<IEnumerable<ContactDetails>>> Get()
        {
            return await _context.Contacts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDetails>> Get(int id )
        {
            var contact = await _context.Contacts.FindAsync(id);
            if(contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult<ContactDetails>> Delete(int  Id)
        {
            var contact = await _context.Contacts.FindAsync(Id);

            if(contact== null)
            {
                return NotFound();
            }

             Console.WriteLine(contact);

            _context.Contacts.Remove(contact);   
            await _context.SaveChangesAsync();


            return NoContent();  
        }

        [HttpPost]
        public async Task<ActionResult<ContactDetails>> Post(ContactDetails contact)
        {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new{ id= contact.Id},contact);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, ContactDetails contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            _context.Entry(contact).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        
    }
}
