using App.Web.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace App.Web.Data
{
    public class SavingsContext : IdentityDbContext<AppUser, AppRole, Guid>
    {
        public DbSet<Entities.SavingsGoal> SavingsGoals { get; set; }

        public SavingsContext(DbContextOptions<SavingsContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(typeof(SavingsContext).Assembly);
        }
    }
}
