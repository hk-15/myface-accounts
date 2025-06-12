// using System.Collections;
// using System.Collections.Generic;
// using System.Linq;
// using MyFace.Data;
// using MyFace.Models.Database;

// namespace MyFace.Models
// {
//     public class UserValidate
//     {

     
//         public bool Login(string username, string password)
//         {
//             using (var context = new MyFaceDbContext(options =>
//             {
//                 options.UseSqlite("Data Source=myface.db");
//             }))
//     {
//                 // Perform data access using the context
//             var user = _context.Users.Find(username.ToLower());
//             if (user != null)
//             {

//                 var passwordCheck = HashGenerator.HashPassword(password, user.Salt);
//                 return user.HashedPassword == passwordCheck;
//             }
//             return false;
     
//        }
//           }
          
//     }
// }