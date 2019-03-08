using System;
using System.Collections.Generic;
using System.Linq;
using App.Web.Data.Entities;

namespace App.Web.Providers
{
    public class SavingsGoalProviderFake : ISavingsGoalProvider
    {
        private readonly string[] titles = {
            "Car", "House", "Computer", "Bike", "Animal", "Condo", "TV", "Video Games"
        };
        private readonly string[] descriptions = {
            "Something Cool", "Something Nice", "Something Sweet", "Something Exciting",
            "Something Odd", "Something New", "Something Fun", "Something Weird"
        };
        private List<SavingsGoal> SavingsGoals { get; set; }

        public SavingsGoalProviderFake()
        {
            Initialize(10);
        }


        private void Initialize(int quantity)
        {
            var rng = new Random();
            var _targetAmount = rng.Next(1000, 9000);
            SavingsGoals = Enumerable.Range(1, quantity).Select(index => new SavingsGoal
            {
                Id = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                TargetAmount = _targetAmount,
                AmountSaved = rng.Next(100, _targetAmount),
                Title = titles[rng.Next(titles.Length)],
                Description = descriptions[rng.Next(descriptions.Length)]
            }).ToList();
        }

        public List<SavingsGoal> GetSavingsGoals()
        {
            return SavingsGoals;
        }
    }
}
