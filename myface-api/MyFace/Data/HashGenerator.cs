using System;
using System.Security.Cryptography;
using System.Text;

namespace MyFace.Data;

public static class HashGenerator
{
    const int keySize = 64;
    const int iterations = 350000;
    public static string HashPassword(string password, byte[] salt)
    {
        HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;
        var hash = Rfc2898DeriveBytes.Pbkdf2(
            Encoding.UTF8.GetBytes(password),
            salt,
            iterations,
            hashAlgorithm,
            keySize);
        return Convert.ToHexString(hash);
    }
}