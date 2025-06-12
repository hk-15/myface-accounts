using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MyFace.Repositories;
using System;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace MyFace.Models
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly IUsersRepo _usersRepo;

        public BasicAuthenticationHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            IUsersRepo usersRepo)
            : base(options, logger, encoder)
        {
            _usersRepo = usersRepo;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return AuthenticateResult.Fail("Missing Authorization Header");
            }

            var authorizationHeader = Request.Headers["Authorization"].ToString();

            if (!AuthenticationHeaderValue.TryParse(authorizationHeader, out var headerValue))
            {
                return AuthenticateResult.Fail("Invalid Authorization Header");
            }

            if (!"Basic".Equals(headerValue.Scheme, StringComparison.OrdinalIgnoreCase))
            {
                return AuthenticateResult.Fail("Invalid Authorization Scheme");
            }

            Console.WriteLine(headerValue.Parameter);
            var credentials = Encoding.UTF8.GetString(Convert.FromBase64String(headerValue.Parameter)).Split(':', 2);

            if (credentials.Length != 2)
            {
                return AuthenticateResult.Fail("Invalid Basic Authentication Credentials");
            }

            var username = credentials[0];
            var password = credentials[1];

            try
            {

                var user = await _usersRepo.ValidateUser(username, password);
                if (user == null)
                {
                    return AuthenticateResult.Fail("Invalid Username or Password");
                }

                var claims = new[]
                {

                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username)
                };

                var claimsIdentity = new ClaimsIdentity(claims, "Basic");

                var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);


                var authenticationTicket = new AuthenticationTicket(claimsPrincipal, "Basic");


                return AuthenticateResult.Success(authenticationTicket);
            }
            catch
            {
                return AuthenticateResult.Fail("Error occurred during authentication");
            }
        }

    }
}