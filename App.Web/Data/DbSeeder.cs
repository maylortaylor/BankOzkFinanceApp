using App.Web.Common;
using App.Web.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace App.Web.Data
{
    public class DbSeeder
    {
        private readonly SavingsContext context;
        private readonly IHostingEnvironment hosting;
        private readonly UserManager<AppUser> userManager;
        private readonly IConfiguration config;

        public DbSeeder(
            SavingsContext ctx,
            IHostingEnvironment hosting,
            UserManager<AppUser> userManager,
            IConfiguration config)
        {
            this.context = ctx;
            this.hosting = hosting;
            this.userManager = userManager;
            this.config = config;
        }

        public async Task SeedAsync()
        {
            context.Database.EnsureCreated();

            // Create Seed Users
            var path = Path.Combine(hosting.ContentRootPath, "Data/users.json");
            var json = File.ReadAllText(path);
            var users = JsonConvert.DeserializeObject<IEnumerable<AppUser>>(json);

            foreach (var user in users)
            {
                var found = await userManager.FindByEmailAsync(user.Email);

                if (found == null)
                {
                    user.Id = GuidHelper.GetHasedGuid(user.FirstName + user.LastName);
                    user.UserName = user.Email;

                    var result = await userManager.CreateAsync(user, config["Seed:DefaultPassword"]);

                    if (result != IdentityResult.Success)
                    {
                        throw new InvalidOperationException("Couldn't create new user in AppSeeder");
                    }
                }

                if (context.SavingsGoals.Count(g => g.UserId == found.Id) == 0)
                {
                    found = await userManager.FindByEmailAsync(user.Email);

                    context.SavingsGoals.Add(new SavingsGoal()
                    {
                        Title = "Lambo",
                        Description = "Gotta trade in my BTC",
                        AmountSaved = 100000,
                        TargetAmount = 1m,
                        UserId = found.Id
                    });

                    context.SavingsGoals.Add(new SavingsGoal()
                    {
                        Title = "Musical Gear",
                        Description = "Gotta be famous",
                        AmountSaved = 10000,
                        TargetAmount = 100,
                        UserId = found.Id
                    });

                    await context.SaveChangesAsync();
                }
            }
        }
    }
}
