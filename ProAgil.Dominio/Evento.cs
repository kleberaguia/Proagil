using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ProAgil.Dominio;

namespace ProAgil.Dominio
{
    public class Evento
    {
        [Key]
        public int Id { get; set; }       
        public string Local { get; set; }        
        public DateTime DataEvento { get; set; }        
        public string Tema { get; set; }
        public int QtPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public List<Lote> Lotes { get; set; }
         public List<RedeSocial> RedesSociais { get; set; }
         public List<PalestranteEvento> PalestranteEventos { get; set; }
        
    }
}