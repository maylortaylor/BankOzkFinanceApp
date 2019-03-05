using System.Collections.Generic;
using App.Web.Models;

namespace App.Web.Providers
{
    public interface ISavingsGoalProvider
    {
        List<SavingsGoal> GetSavingsGoals();
    }
}