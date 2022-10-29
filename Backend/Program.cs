using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

using PH.Data;

// var MyAllowSpecificOrigins = "TestCors";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(name: MyAllowSpecificOrigins,
//                       policy  =>
//                       {
//                           policy.WithOrigins("*")
//                           .AllowAnyHeader()
//                            .AllowAnyMethod();
//                       });
// });
builder.Services.AddDbContext<PHDBContext>(
    options => options.UseSqlite(builder.Configuration["PHAPIConnection"]));
builder.Services.AddControllers();
builder.Services.AddScoped<IPHRepo, PHRepo>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

// app.UseCors(MyAllowSpecificOrigins);

// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();

app.Run();