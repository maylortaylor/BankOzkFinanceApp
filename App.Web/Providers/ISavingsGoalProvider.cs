using System.Collections.Generic;
using App.Web.Data.Entities;

namespace App.Web.Providers
{
    public interface ISavingsGoalProvider
    {
        List<SavingsGoal> GetSavingsGoals();
    }
}
