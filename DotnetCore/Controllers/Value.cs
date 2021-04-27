using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProAgil.Repositorio;

namespace DotnetCore.Controllers
{

    [ApiController]
    [Route("api/[Controller]")]
    public class Value: ControllerBase
    {

        public readonly ProAgilContext _context ;


        public Value(ProAgilContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> Get(){

            try
            {
                var result =  await _context.Eventos.ToListAsync();
                 return Ok(result);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Banco de Dados Falhou");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id){
            try
            {
                var result  =  await _context.Eventos.FirstOrDefaultAsync(x=>x.Id == id);
                return Ok(result);
            }
            catch (System.Exception)
            {
                 return this.StatusCode(StatusCodes.Status500InternalServerError,"Erro de banco de dados");
            }
        }
    }
}