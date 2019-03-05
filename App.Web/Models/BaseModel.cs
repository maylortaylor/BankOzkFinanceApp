using System;

namespace App.Web.Models
{
    public class BaseModel
    {
        public Guid Id { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
        public string DeletedAt { get; set; }

    }
}