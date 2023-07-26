﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using System.IdentityModel.Tokens.Jwt;
using Test.Data;
using Test.Models;

namespace Test.Controllers.ApiControllers
{
    [Route("api/info")]
    [ApiController]
    public class InfoController : ControllerBase
    {
        private readonly CompanyContext _companyContext;
        public InfoController(CompanyContext comppanyContext)
        {
            _companyContext = comppanyContext;
        }

        /// <summary>
        /// Get user project by its token
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [IgnoreAntiforgeryToken]
        [Route("getProjects")]
        [Authorize]
        public IActionResult GetProjects()
        {
           
            var currentUser = HttpContext.User;

            if (currentUser.HasClaim(c => c.Type == JwtRegisteredClaimNames.Email))
            {
                //Get user by email and then get user projects
                var email = currentUser.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email).Value;

              var person=  _companyContext.People.FirstOrDefault(x => x.Email == email);
                if (person == null)
                    return NotFound();
               
                return Ok(person.Projects);
               
            }
           

            return NotFound();
        }
    }
}
