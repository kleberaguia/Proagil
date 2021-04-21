import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css']
})
export class EventosComponent implements OnInit {


  eventos: any;
  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.getEventos();
  }

  // tslint:disable-next-line:typedef
  getEventos() {
    this.http.get('http://localhost:5000/api/value').subscribe(response =>
    {
     this.eventos = response;
     console.log(this.eventos);
    },
    (erro: any) => {
      console.error(erro);
    }

    );
  }

}
