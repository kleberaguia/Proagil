using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Dominio;
using ProAgil.Repositorio;

namespace DotnetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController: ControllerBase
    {
        private readonly IProAgilRepositorio _repo;
        public EventoController(IProAgilRepositorio repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get(){
            try
            {
                var result =  await _repo.GetAllEventoAsync(true);
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
                var result  =  await _repo.GetEventoAsyncById(id,true);
                return Ok(result);
            }
            catch (System.Exception)
            {
                 return this.StatusCode(StatusCodes.Status500InternalServerError,"Erro de banco de dados");
            }
        }

         [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema){
            try
            {
                var result  =  await _repo.GetAllEventoAsyncByTema(tema,true);
                return Ok(result);
            }
            catch (System.Exception)
            {
                 return this.StatusCode(StatusCodes.Status500InternalServerError,"Erro de banco de dados");
            }
        }

         [HttpPost]
        public async Task<IActionResult> Post(Evento model){
            try
            {
                 _repo.Add(model);
               if(await _repo.SaveChangeAsync())
               {
                    return Created($"/api/evento/{model.Id}",model);
               }
            }
            catch (System.Exception)
            {
                 return this.StatusCode(StatusCodes.Status500InternalServerError,"Erro de banco de dados");
            }

            return BadRequest();
        }

         [HttpPut("{eventoId}")]
        public async Task<IActionResult> Put(int eventoId, Evento model){
            try
            {
                var evento = _repo.GetEventoAsyncById(eventoId,false);

                if(evento == null) return NotFound();
                _repo.Update(model);              
               
               if(await _repo.SaveChangeAsync())
               {
                    return Created($"/api/evento/{model.Id}",model);
               }
            }
            catch (System.Exception)
            {
                 return this.StatusCode(StatusCodes.Status500InternalServerError,"Erro de banco de dados");
            }

            return BadRequest();
        }


          [HttpDelete("{eventoId}")]
        public async Task<IActionResult> Delete(int eventoId){
            try
            {
                  var evento  = await _repo.GetEventoAsyncById(eventoId, false);
              

                if(evento == null) return NotFound();
                 _repo.Delete(evento);              
               
               if(await _repo.SaveChangeAsync())
               {
                    return Ok();
               }
            }
            catch (System.Exception ex)
            {
                throw new System.Exception(ex.Message);
                 //return this.StatusCode(StatusCodes.Status500InternalServerError,"Erro de banco de dados");
            }

            return BadRequest();
        }









    }
}