using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Web.Providers;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly ISavingsGoalProvider savingsGoalsProvider;

        public SampleDataController(ISavingsGoalProvider savingsGoalsProvider)
        {
            this.savingsGoalsProvider = savingsGoalsProvider;
        }

        [HttpGet("[action]")]
        public IActionResult SavingsGoals([FromQuery(Name = "from")] int from = 0, [FromQuery(Name = "to")] int to = 4)
        {
            System.Threading.Thread.Sleep(500); // Fake latency

            var quantity = to - from;

            if (quantity <= 0)
            {
                return BadRequest("You cannot have the 'to' parameter higher than 'from' parameter.");
            }

            if (from < 0)
            {
                return BadRequest("You cannot go in the negative with the 'from' parameter");
            }
            var savingsGoals = savingsGoalsProvider.GetSavingsGoals();
            var result = new
            {
                Total = savingsGoals.Count,
                SavingsGoals = savingsGoals.Skip(from).Take(quantity).ToArray()
            };

            return Ok(result);
        }
    }
}
