import { Component, OnInit, TemplateRef } from '@angular/core';
import { Eventos } from '../_models/Eventos';
import { EventoService } from '../_services/evento.service';
import { ThrowStmt } from '@angular/compiler';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BsLocaleService} from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale} from 'ngx-bootstrap/locale';
import { error } from '@angular/compiler/src/util';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventosFiltrados: Eventos[];
  eventos: Eventos[];
  evento!: Eventos;
  imagemlagura = 50;
  imagemmargin = 50;
  mostraImagem =  false;
  moduSalvar = 'post';
  bodyDeletarEvento = '';
  registerForm!: FormGroup;
     // tslint:disable-next-line:variable-name
   _filtroLista!: string;
  get filtroLista(): string {

    return this._filtroLista;

  }

  set filtroLista(value: string){
    this._filtroLista =  value;
    this.eventosFiltrados =  this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
  }
   // tslint:disable-next-line:typedef
   ngOnInit(){
    this.validation();
    this.getEventos();
  }


  constructor(
      private eventoService: EventoService,
      private modalservice: BsModalService,
      private fb: FormBuilder,
      private localService: BsLocaleService) {
      this.localService.use('pt-br');
      this.eventosFiltrados = [];
      this.eventos = [];
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
  openModal( template: any){
    this.registerForm.reset();
    template.show();
  }
  // tslint:disable-next-line:typedef
  alternarImagem(){
    this.mostraImagem = !this.mostraImagem;
  }

  // tslint:disable-next-line:typedef
  validation(){
    this.registerForm =  this.fb.group({

      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      dataEvento: ['', [Validators.required]],
      qtPessoas: ['', [Validators.required, Validators.max(120000)]],
      imagemURL: ['', Validators.required],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]

    });
  }

  // tslint:disable-next-line:typedef
  salvarAlteracao(template: any){

    if (this.registerForm.valid) {
      if ( this.moduSalvar === 'post'){
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
               ( novoEvento: Eventos ) => {
                  console.log(novoEvento);
                  template.hide();
                  this.getEventos();
                },
                // tslint:disable-next-line:no-shadowed-variable
                error => {
                  console.log(error);
                }
            );
      }else{
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        this.eventoService.putEventos(this.evento).subscribe(
               ( novoEvento: any ) => {
                  // tslint:disable-next-line:align
                  this.getEventos();
                  // tslint:disable-next-line:align
                  template.hide();
                },
                // tslint:disable-next-line:no-shadowed-variable
                error => {
                  console.log(error);
                }
            );
      }
    }
  }

  // tslint:disable-next-line:typedef
  btnEditar(eventoAtual: Eventos, template: any){
    this.moduSalvar = 'put';
    this.openModal(template);
    this.evento = eventoAtual;
    this.registerForm.patchValue(this.evento);

  }

  // tslint:disable-next-line:typedef
  excluirEvento(evento: Eventos, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  // tslint:disable-next-line:typedef
  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
        }, erro => {
          console.log(erro);
        }
    );
  }

  // tslint:disable-next-line:typedef
  novoEvento(template: any){
    this.openModal(template);
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
