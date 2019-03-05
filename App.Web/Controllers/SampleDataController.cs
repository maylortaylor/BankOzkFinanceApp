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
        public IActionResult SavingsGoals()
        {
            var savingsGoals = savingsGoalsProvider.GetSavingsGoals();
            var result = new
            {
                Total = savingsGoals.Count,
                SavingsGoals = savingsGoals.ToArray()
            };

            return Ok(result);
        }
    }
}
