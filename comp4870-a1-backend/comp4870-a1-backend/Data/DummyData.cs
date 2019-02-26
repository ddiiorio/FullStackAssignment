using comp4870_a1_backend.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace comp4870_a1_backend.Data
{
    public static class DummyData
    {
        public static async Task Initialize(
            IApplicationBuilder app
            )
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
                context.Database.EnsureCreated();
                // context.Database.Migrate();

                var users = GetUsers();

                if (!context.Users.Any())
                {
                    context.Users.AddRange(users);
                    context.SaveChanges();
                }

                var boats = GetBoats();

                if (!context.Boats.Any())
                {
                    context.Boats.AddRange(boats);
                    context.SaveChanges();
                }
                
            }

        
            
        }

        private static List<User> GetUsers()
        {
            return new List<User>()
            {
                new User()
                {
                    UserName = "a",
                    Email = "a@a.a",
                    Password = "aPass",
                    FirstName = "aFirst",
                    LastName = "aLast",
                    Country = "aCountry",
                    MobileNumber = "1231231231",
                    Role = Role.Admin,
                },
                new User()
                {
                    UserName = "b",
                    Email = "b@b.b",
                    Password = "bPass",
                    FirstName = "bFirst",
                    LastName = "bLast",
                    Country = "bCountry",
                    MobileNumber = "1231231231",
                    Role = Role.Member,
                },
                new User()
                {
                  UserName = "c",
                    Email = "c@c.c",
                    Password = "cPass",
                    FirstName = "cFirst",
                    LastName = "cLast",
                    Country = "cCountry",
                    MobileNumber = "1231231231",
                    Role = Role.Admin,
                }
            };
        }

        private static List<Boat> GetBoats()
        {
            return new List<Boat>()
            {
                new Boat()
                {
                    BoatName = "BoatName1",
                    Picture = "Picture1",
                    LengthInFeet = 1,
                    Make = "Make1",
                    Description = "Description1",
                },
                new Boat()
                {
                    BoatName = "BoatName2",
                    Picture = "Picture2",
                    LengthInFeet = 2,
                    Make = "Make2",
                    Description = "Description2",
                },
                new Boat()
                {
                    BoatName = "BoatName3",
                    Picture = "Picture3",
                    LengthInFeet = 3,
                    Make = "Make3",
                    Description = "Description3",
                }
            };
        }
    }
}
