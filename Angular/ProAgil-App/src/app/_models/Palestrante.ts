import { Eventos } from './Eventos';
import { RedeSocial } from './RedeSocial';

export interface Palestrante {
     id: number;
     nome: string;
     miniCurriculo: string;
     imagemgURL: string;
     telefone: string;
     email: string;
     redeSociais: RedeSocial[];
     palestrantesEventos: Eventos[];
}
