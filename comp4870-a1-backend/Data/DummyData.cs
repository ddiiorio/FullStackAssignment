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
                    Password = "P@$$w0rd",
                    FirstName = "aFirst",
                    LastName = "aLast",
                    Country = "aCountry",
                    MobileNumber = "1231231231",
                    Role = Role.Admin,
                },
                new User()
                {
                    UserName = "m",
                    Email = "m@m.m",
                    Password = "P@$$w0rd",
                    FirstName = "mFirst",
                    LastName = "mLast",
                    Country = "mCountry",
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
                    BoatName = "Nice Boat",
                    Picture = "https://upload.wikimedia.org/wikipedia/commons/d/d9/Motorboat_at_Kankaria_lake.JPG",
                    LengthInFeet = 12,
                    Make = "Good Make",
                    Description = "Slick looking boat",
                },
                new Boat()
                {
                    BoatName = "Big Boat",
                    Picture = "https://www.bavariayachts.com/fileadmin/_processed_/e/c/csm_bavaria-mb-overview-virtessline_4e4f48597b.jpg",
                    LengthInFeet = 50,
                    Make = "Nice Boat",
                    Description = "Real nice boat",
                },
                new Boat()
                {
                    BoatName = "Beautiful Boat",
                    Picture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoRBpH2oRn7M7m8VXZefab_9GbLyWp2zdj8-TWA1nDloPpms5r",
                    LengthInFeet = 15,
                    Make = "Beautiful Boat",
                    Description = "Good looking boat with some company",
                },
                new Boat()
                {
                    BoatName = "Van Boat",
                    Picture = "https://i.pinimg.com/originals/4f/f0/fa/4ff0fa1b6f4cb2164f6d2a5003dd2e21.jpg",
                    LengthInFeet = 15,
                    Make = "Self made",
                    Description = "This is a self made boat home",
                },
                new Boat()
                {
                    BoatName = "Boat home",
                    Picture = "https://www.thehulltruth.com/attachment.php?attachmentid=216262&stc=1&d=1327454305",
                    LengthInFeet = 10,
                    Make = "Self made",
                    Description = "Boat made by self",
                }
            };
        }
    }
}
