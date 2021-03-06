﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using comp4870_a1_backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;

namespace comp4870_a1_backend.Controllers
{

    // [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class BoatsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BoatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Boats
        [Authorize(Roles = "Admin, Member")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Boat>>> GetBoats()
        {
            return await _context.Boats.ToListAsync();
        }

        // GET: api/Boats/5
        [Authorize(Roles = "Admin, Member")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Boat>> GetBoat(int id)
        {
            var boat = await _context.Boats.FindAsync(id);

            if (boat == null)
            {
                return NotFound();
            }

            return boat;
        }

        // PUT: api/Boats/5
        [Authorize(Roles = "Admin, Member")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBoat(int id, Boat boat)
        {
            if (id != boat.BoatId)
            {
                return BadRequest();
            }

            _context.Entry(boat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BoatExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Boats
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Boat>> PostBoat(Boat boat)
        {
            if (boat.BoatName == null)
            {
                return BadRequest(new { Response = "BoatName Missing" });
            }
            if (boat.LengthInFeet == 0)
            {
                return BadRequest(new { Response = "LengthInFeet cannot be empty or 0" });
            }
            if (boat.Make == null)
            {
                return BadRequest(new { Response = "Make missing" });
            }
            if (boat.Picture == null)
            {
                return BadRequest(new { Response = "Picture missing" });
            }

            _context.Boats.Add(boat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBoat", new { id = boat.BoatId }, boat);
        }

        // DELETE: api/Boats/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Boat>> DeleteBoat(int id)
        {
            var boat = await _context.Boats.FindAsync(id);
            if (boat == null)
            {
                return NotFound();
            }

            _context.Boats.Remove(boat);
            await _context.SaveChangesAsync();

            return boat;
        }

        private bool BoatExists(int id)
        {
            return _context.Boats.Any(e => e.BoatId == id);
        }
    }
}
