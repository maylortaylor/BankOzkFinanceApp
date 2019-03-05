namespace App.Web
{
    public class SavingsGoal : BaseModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; }
        public int? TargetAmount { get; set; }
        public int? AmountSaved { get; set; }

    }
}