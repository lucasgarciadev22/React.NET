using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using tech_test_payment_api.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<OrderContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("StandardDBConnection")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
  options.SwaggerDoc("v1.2", new OpenApiInfo
  {
    Version = "v1.2",
    Title = "Azure Payment API NET + React",
    Description = "A NET 6.0 Web API to simulate payment & delivery processes in an e-commerce." +
    "It uses Entity Framework Core as ORM , data persistence in Azure Cloud (SQL Data Base & Azure Table) and follows the REST protocol.",
    TermsOfService = new Uri("https://gitlab.com/lucasgarciadev22/tech-test-payment-api"),
    Contact = new OpenApiContact
    {
      Name = "Visit my Github",
      Url = new Uri("https://github.com/lucasgarciadev22/lucasgarciadev22")
    },
    License = new OpenApiLicense
    {
      Name = "API License (Swagger)",
      Url = new Uri("https://swagger.io/license/")
    }
  });
  var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
  options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
