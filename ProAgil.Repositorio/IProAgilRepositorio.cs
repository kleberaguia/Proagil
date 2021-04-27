using System.Threading.Tasks;
using ProAgil.Dominio;

namespace ProAgil.Repositorio
{
    public interface IProAgilRepositorio 
    {
        //Geral
        void Add<T>(T entity) where T: class;
        void Update<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveChangeAsync();

        //Eventos
        Task<Evento[]>GetAllEventoAsyncByTema(string tema, bool includePalestrante);
        Task<Evento[]>GetAllEventoAsync(bool includePalestrante);
        Task<Evento>GetEventoAsyncById(int eventoId, bool includePalestrante);

        //Palestrante
        Task<Palestrante[]>GetAllPalestranteAsync(bool includeEventos);

        Task<Palestrante>GetPalestranteById(int palestranteId, bool includeEventos);

        Task<Palestrante[]>GetPalestranteByName(string nome,  bool includeEventos);


        




         
    }
}