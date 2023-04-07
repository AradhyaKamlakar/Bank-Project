using Bank.Data;
using Bank.Interfaces;
using Bank.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IService, ServiceRepository>();
builder.Services.AddScoped<IUser, UserRepository>();  
builder.Services.AddScoped<IToken, TokenRepository>();

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.WithOrigins("*")
                   .SetIsOriginAllowedToAllowWildcardSubdomains()
                   .WithMethods("GET", "POST", "DELETE")
                   .WithHeaders("Content-Type", "Authorization")
                   .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
        });
});


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.Run();
