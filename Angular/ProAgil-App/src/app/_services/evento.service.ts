
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eventos } from '../_models/Eventos';

@Injectable({
   providedIn: 'root'
})
export class EventoService {

  baseRRL = 'http://localhost:5000/api/Evento';

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:typedef
  getAllEvento(): Observable<Eventos[]>{
    return this.http.get<Eventos[]>(this.baseRRL);
  }

  getEventoByTema(tema: string): Observable<Eventos[]>{
    return this.http.get<Eventos[]>(`${this.baseRRL}/getByTema/${tema}`);
  }


  getEventoById(id: number): Observable<Eventos>{
    return this.http.get<Eventos>(`${this.baseRRL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  postEvento(evento: Eventos) {
    return this.http.post<Eventos>(this.baseRRL, evento);
  }

  putEventos(evento: Eventos): Observable<Eventos>{
      return this.http.put<Eventos>(`${this.baseRRL}/${evento.id}`, evento);
  }

  // tslint:disable-next-line:typedef
  deleteEvento(id: number){
    return this.http.delete(`${this.baseRRL}/${id}`);
  }

}
