import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { gifData, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string;
  private _historial: string[];
  public resultados: gifData[];

  constructor(private http: HttpClient) { //por ser un servicio es un Singleton (usaremos siempre la misma instancia)
    this.apiKey = 'CcywV7UImabTBoggdBANpxPNs1HSFwRw';
    this._historial = [];
    //null, undefined, NaN, '', 0 y false son todos evaluados como false (JavaScript)
    this.resultados = (localStorage.getItem('historial'))
      ? this._historial = JSON.parse(localStorage.getItem('historial')!) //! al final indica que estoy seguro de que no va a venir nulo por la comprobación previa (pinta error porque estamos usando Angular strict)
      : [];
    //Otra manera de hacerlo...
    // this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  public get getHistorial(): string[] {
    return [...this._historial]; //Uso el operador Spread para romper la relación con el array _historial original para evitar problemas en posibles modificaciones 
  }

  public buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase();
    if (query.length === 0) { //Si viene vacío, no hago nada 
      return;
    }
    if (!this._historial.includes(query)) {
      console.log('se escribió... ', query);
      this._historial.unshift(query); //Lo añado al principio del array
      this._historial = this._historial.splice(0, 10); //Me quedo solo con 10 elementos
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    console.log(`peticionando ${query} a la API`);

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=CcywV7UImabTBoggdBANpxPNs1HSFwRw&q=${query}&limit=15`)
      .subscribe((resp: SearchGifsResponse) => { //Esta petición HTTP devuelve un Observable (RxJS)
        console.log('obteniendo respuesta...')
        console.log(resp.data);
        this.resultados = resp.data;
      });

  }

}
