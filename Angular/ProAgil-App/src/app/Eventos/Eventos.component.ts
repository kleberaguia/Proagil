

import { Component, OnInit, TemplateRef } from '@angular/core';
import { Eventos } from '../_models/Eventos';
import { EventoService } from '../_services/evento.service';
import { ThrowStmt } from '@angular/compiler';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventosFiltrados: Eventos[];
  eventos: Eventos[];
  imagemlagura = 50;
  imagemmargin = 50;
  mostraImagem =  false;
  modalRef!: BsModalRef ;
   // tslint:disable-next-line:variable-name
   _filtroLista: string;
  get filtroLista(): string {

    return this._filtroLista;

  }

  set filtroLista(value: string){
    this._filtroLista =  value;
    this.eventosFiltrados =  this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
  }


  constructor(
      private eventoService: EventoService,
      private modalservice: BsModalService) {

    this._filtroLista = '';
    this.eventosFiltrados = [];
    this.eventos = [];
  }

  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.getEventos();
  }

  filtrarEvento(filtrarpor: string): Eventos[]{
    filtrarpor = filtrarpor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string; qtPessoas: number;  dataEvento: Date}) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarpor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarpor) !== -1 ||
        evento.qtPessoas.toString().toLocaleLowerCase().indexOf(filtrarpor) !== -1 ||
        evento.dataEvento.toString().toLocaleLowerCase().indexOf(filtrarpor) !== -1
      );
  }


  // tslint:disable-next-line:typedef
  openModal( template: TemplateRef<any>){
    this.modalRef =  this.modalservice.show(template);
  }
  // tslint:disable-next-line:typedef
  alternarImagem(){
    this.mostraImagem = !this.mostraImagem;
  }

  // tslint:disable-next-line:typedef
  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      // tslint:disable-next-line:variable-name
      (_eventos: Eventos[]) =>
    {
     this.eventos = _eventos;
     console.log(_eventos);
    },
    (erro: any) => {
      console.error(erro);
    }

    );
  }

}
