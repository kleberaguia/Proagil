using System.ComponentModel.DataAnnotations;

namespace DotnetCore.Model
{
    public class Evento
    {
        [Key]
        public int EnventoId { get; set; }
        public string DataEvento { get; set; }
        public string Edicao { get; set; }

        public int QtPessoas { get; set; }
        public string Tema { get; set; }
        
    }
}