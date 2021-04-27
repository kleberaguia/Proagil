using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAgil.Dominio;

namespace ProAgil.Repositorio
{
    public class ProAgilRepositorio : IProAgilRepositorio
    {

        private readonly ProAgilContext _context;
        public ProAgilRepositorio(ProAgilContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }        

        public void Update<T>(T entity) where T : class
        {
           _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

         public async Task<bool> SaveChangeAsync()
        {
            return (await _context.SaveChangesAsync()) > 0 ;
        }

        //Eventos
        public async Task<Evento[]> GetAllEventoAsync(bool includePalestrante=false)
        {
           IQueryable<Evento> query =  _context.Eventos
           .Include(c => c.Lotes)
           .Include(c => c.RedesSociais);
           if(includePalestrante){
               query = query
               .Include(pe => pe.PalestranteEventos)
               .ThenInclude(p => p.Palestrante);
           }
           query = query.AsNoTracking()
           .OrderByDescending(c => c.DataEvento);
           return await query.ToArrayAsync();

        }
        public async Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrante)
        {
            IQueryable<Evento>query = _context.Eventos
            .Include(c => c.Lotes)
            .Include(c => c.RedesSociais);
            if(includePalestrante){
                query = query
                .Include(pe => pe.PalestranteEventos)
                .ThenInclude(p => p.Palestrante);
            }
            query = query.AsNoTracking()
            .OrderByDescending(c => c.DataEvento)
            .Where(c => c.Tema == tema);

            return await query.ToArrayAsync();


        }
        public async Task<Evento> GetEventoAsyncById(int eventoId, bool includePalestrante)
        {
           IQueryable<Evento> query = _context.Eventos
           .Include(c => c.Lotes)
           .Include(c => c.RedesSociais);
           if(includePalestrante){
               query = query
               .Include(pe => pe.PalestranteEventos)
               .ThenInclude(p => p.Palestrante);
           }
           query =  query.AsNoTracking()
           .OrderByDescending(c => c.DataEvento)
           .Where(c => c.Id == eventoId);
           return await query.FirstOrDefaultAsync();
        }

         //Palestrante
        public async Task<Palestrante[]> GetAllPalestranteAsync(bool includeEventos = false)
        {
           IQueryable<Palestrante> query = _context.Palestrantes
           .Include(c => c.RedeSociais);
            if(includeEventos){
                query =  query
                .Include(pe => pe.PalestrantesEventos)
                .ThenInclude(e => e.Eventos);
            }
            query = query.OrderBy(c => c.Nome);
            return await query.ToArrayAsync();
        }     
        public async Task<Palestrante> GetPalestranteById(int palestranteId, bool includeEventos =  false)
        {
           IQueryable<Palestrante> query = _context.Palestrantes
           .Include(c => c.RedeSociais);
           if(includeEventos){
               query =  query
               .Include(pe => pe.PalestrantesEventos)
               .ThenInclude(e=>e.Eventos);
           }
           query =  query.OrderBy(p => p.Nome)
                    .AsNoTracking()
                    .Where(p => p.Id == palestranteId);
            return await query.FirstOrDefaultAsync();
        }

         public async Task<Palestrante[]> GetPalestranteByName(string nome, bool includeEventos =  false)
        {
           IQueryable<Palestrante> query = _context.Palestrantes
           .Include(c => c.RedeSociais);
           if(includeEventos){
               query =  query
               .Include(pe => pe.PalestrantesEventos)
               .ThenInclude(e=>e.Eventos);
           }
           query =  query.AsNoTracking()
           .Where(p => p.Nome.ToLower().Contains(nome.ToLower()));
           return await query.ToArrayAsync();
        }
    }
}