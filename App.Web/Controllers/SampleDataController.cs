using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Titles = new[]
        {
            "Car", "Braces", "House", "Condo", "School", "Bike", "Video Games"
        };

        [HttpGet("[action]")]
        public IEnumerable<SavingsGoal> SavingsGoals()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new SavingsGoal
            {
                CreatedAt = DateTime.Now.AddDays(index).ToString("d"),
                AmountSaved = rng.Next(0, 1000),
                TargetAmount = rng.Next(2000, 9000),
                Title = Titles[rng.Next(Titles.Length)]
            });
        }


    }
}
