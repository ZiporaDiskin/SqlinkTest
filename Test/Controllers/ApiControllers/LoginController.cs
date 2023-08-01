using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Test.Data;
using Test.Models;
using Test.WebModels;

namespace Test.Controllers.ApiControllers
{
    [ApiController]
    [Route("api/login")]
    public class LoginController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly CompanyContext _companyContext;

        public LoginController(IConfiguration configuration, CompanyContext companyContext)
        {
            _configuration = configuration;
            _companyContext = companyContext;
        }
        /// <summary>
        /// Login method: recive email and password and return user details and token
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost]
        [Route("authenticate")]
        public IActionResult Authenticate([FromBody] User login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { Token = tokenString, PersonalDetails = user  });
            }

            return response;
        }
        /// <summary>
        /// Generate jwt token for user
        /// </summary>
        /// <param name="userInfo"></param>
        /// <returns>string token</returns>
        private string GenerateJSONWebToken(Person userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
            new Claim(JwtRegisteredClaimNames.Sub, userInfo.Password),
            new Claim(JwtRegisteredClaimNames.Email, userInfo.Email),
            new Claim("DateOfJoing", userInfo.JoinAt.ToString("yyyy-MM-dd")),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
              };

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        /// <summary>
        /// Authenticate user by email and password
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        private Person? AuthenticateUser(User login)
        {
            //Validate the User Credentials
            var user = _companyContext.People.FirstOrDefault(x => x.Email == login.Email && x.Password == login.Password);
            return user;



        }
    }
}
