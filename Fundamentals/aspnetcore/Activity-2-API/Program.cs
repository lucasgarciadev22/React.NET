using System.Text.Json.Serialization;
using ActivityExercisesAPI.Data.Context;
using ActivityExercisesAPI.Data.Repositories;
using ActivityExercisesAPI.Domain.Interfaces.Repositories;
using ActivityExercisesAPI.Domain.Interfaces.Services;
using ActivityExercisesAPI.Domain.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddDbContext<DataContext>(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("Default"))
);

builder.Services.AddScoped<IActivityRepo, ActivityRepo>();//redirect repo
builder.Services.AddScoped<IGeneralRepo, GeneralRepo>();//redirect repo
builder.Services.AddScoped<IActivityService, ActivityService>();//redirect service

builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(options =>
{
  options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});//serialize enum values to access string
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

//allowing axios to access my api trough CORS
app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.MapControllers();

app.Run();
