using System;

namespace ProAgil.Dominio
{
    public class Lote
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public decimal Preco { get; set; }

        public DateTime? DtInicio { get; set; }

        public DateTime? DtFim { get; set; }

        public int qtde { get; set; }

        public int EventoId { get; set; }

        public Evento Evento { get;}



    }
}