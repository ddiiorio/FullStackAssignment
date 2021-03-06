﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using comp4870_a1_backend.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace comp4870_a1_backend.Controllers
{
    // [EnableCors]
    public class AuthController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private ApplicationDbContext _context;

        public AuthController( IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [Route("register")]
        [HttpPost]
        public async Task<ActionResult> InsertUser([FromBody] User model)
        {
            var user = _context.Users.Find(model.UserName);
            var email = _context.Users.Find(model.Email);
            // Checks whether user exists
            if (user != null || email != null)
            {
                return BadRequest(new { response = "StatusExists" });
            }

            model.SecurityStamp = Guid.NewGuid().ToString();
            model.Role = Role.Member;

            _context.Users.Add(model);
            _context.SaveChanges();

            return Ok(new { response = "StatusSuccess" });
        }

        [Route("login")]
        [HttpPost]
        public async Task<ActionResult> Login([FromBody] User model)
        {
            var user = _context.Users.Find(model.UserName);
            if (user == null || (model.Password != user.Password))
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim(ClaimTypes.NameIdentifier, user.UserName)
                }),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_configuration["Jwt:ExpiryInMinutes"])),
                Issuer = _configuration["Jwt:Site"],
                Audience = _configuration["Jwt:Site"],
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SigningKey"])), SecurityAlgorithms.HmacSha256)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                expiration = token.ValidTo,
                role = user.Role
            });
        }
    }

}