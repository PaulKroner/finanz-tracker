using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using backend.Repository;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

Env.Load();
string connectionString =
    $"Host={Env.GetString("PGHOST")};" +
    $"Port ={Env.GetString("PGPORT")};" +
    $"Database={Env.GetString("PGDATABASE")};" +
    $"Username ={Env.GetString("PGUSER")};" +
    $"Password={Env.GetString("PGPASSWORD")}";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Controller aktivieren
builder.Services.AddControllers();
builder.Services.AddScoped<IIncomeRepository, IncomeRepository>();
builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

// Routing aktivieren
app.MapControllers();

// app.MapGet("/", () => "Hello World!");

app.Run();
