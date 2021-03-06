
namespace ProAgil.Dominio
{
    public class RedeSocial
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string URL { get; set; }

        public int? EventoId { get; set; }
        public Evento Eventos { get; }

        public int? PalestranteId { get; set; }

        public Palestrante Palestrante { get; set; }
    }
}