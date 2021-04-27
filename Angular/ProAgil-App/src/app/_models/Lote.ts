export interface Lote {

    id: number;
    nome: string;
    preco: number;
    dtInicio?: Date;
    dtFim?: Date;
    qtde: number;
    eventoId: number;
}
