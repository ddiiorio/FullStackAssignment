using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace comp4870_a1_backend.Data
{
    public class Boat
    {
        public int BoatId { get; set; }
        public string BoatName { get; set; }
        public string Picture { get; set; }
        public int LengthInFeet { get; set; }
        public string Make { get; set; }
        public string Description { get; set; }
    }
}
