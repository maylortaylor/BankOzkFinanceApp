using System;
using System.Security.Cryptography;
using System.Text;

namespace App.Web.Common
{
    public class GuidHelper
    {
        public GuidHelper()
        {
        }

        public static Guid GetHasedGuid(string input)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] hash = md5.ComputeHash(Encoding.Default.GetBytes(input));
                Guid result = new Guid(hash);

                return result;
            }
        }
    }
}
