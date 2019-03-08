using System;

namespace App.Web.Data.Entities
{
    public class SavingsGoal : BaseModel
    {
        public Guid UserId { get; set; }
        public AppUser User { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal AmountSaved { get; set; }
    }
}
