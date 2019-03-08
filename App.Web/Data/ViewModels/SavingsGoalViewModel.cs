namespace App.Web.Data.ViewModels
{
    public class SavingsGoalViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal AmountSaved { get; set; }
    }
}
