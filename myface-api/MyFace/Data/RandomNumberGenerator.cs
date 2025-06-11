using System;
using MyFace.Models.Database;

namespace MyFace.Data
{
    public static class RandomNumberGenerator
    {
        private static readonly Random Random = new Random();
        private static int keySize = 64;

        public static int GetUserId()
        {
            return Random.Next(1, SampleUsers.NumberOfUsers + 1);
        }

        public static int GetPostId()
        {
            return Random.Next(1, SamplePosts.NumberOfPosts + 1);
        }

        public static InteractionType GetInteractionType()
        {
            return Random.Next(0, 2) == 0 ? InteractionType.LIKE : InteractionType.DISLIKE;
        }

        public static byte[] GenerateSalt()
        {
            byte[] randomBytes = new byte[keySize];

            Random.NextBytes(randomBytes);
            return randomBytes;
        }
    }     
}
