using ContactAPI.Data;
using ContactAPI.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<ContactDbContext>(options =>
        options.UseInMemoryDatabase("ContactDb"));

builder.Services.AddControllers();

var frontendURL = builder.Configuration.GetValue<string>("frontend_url")??"http://localhost:3001";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(frontendURL)  // Use the frontend URL, or default if missing
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


var app = builder.Build();

app.UseCors("AllowFrontend");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ContactDbContext>();
    if (!context.Contacts.Any())
    {
        context.Contacts.AddRange(
            new ContactDetails { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Phone = "123-456-7890", Address = "123 Main St" },
            new ContactDetails { FirstName = "Jane", LastName = "Smith", Email = "jane.smith@example.com", Phone = "234-567-8901", Address = "456 Oak St" },
            new ContactDetails { FirstName = "Bob", LastName = "Johnson", Email = "bob.johnson@example.com", Phone = "345-678-9012", Address = "789 Pine St" },
            new ContactDetails { FirstName = "Alice", LastName = "Davis", Email = "alice.davis@example.com", Phone = "456-789-0123", Address = "321 Birch St" },
            new ContactDetails { FirstName = "Charlie", LastName = "Miller", Email = "charlie.miller@example.com", Phone = "567-890-1234", Address = "654 Maple St" },
            new ContactDetails { FirstName = "David", LastName = "Wilson", Email = "david.wilson@example.com", Phone = "678-901-2345", Address = "987 Cedar St" },
            new ContactDetails { FirstName = "Emily", LastName = "Moore", Email = "emily.moore@example.com", Phone = "789-012-3456", Address = "111 Elm St" },
            new ContactDetails { FirstName = "Frank", LastName = "Taylor", Email = "frank.taylor@example.com", Phone = "890-123-4567", Address = "222 Willow St" },
            new ContactDetails { FirstName = "Grace", LastName = "Anderson", Email = "grace.anderson@example.com", Phone = "901-234-5678", Address = "333 Cherry St" },
            new ContactDetails { FirstName = "Henry", LastName = "Thomas", Email = "henry.thomas@example.com", Phone = "012-345-6789", Address = "444 Ash St" }
        );
        context.SaveChanges();
    }
}


app.Run();


