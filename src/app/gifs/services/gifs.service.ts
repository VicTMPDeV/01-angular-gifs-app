import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { gifData, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private peticionHttp: HttpClient;
  private apiKey: string;
  private serviceUrl: string;
  private endPoint: string;
  private _historialBusqueda: string[];
  public resultadosBusquedaApi: gifData[];

  constructor(httpRq: HttpClient) { //por ser un servicio es un Singleton (usaremos siempre la misma instancia)
    this.peticionHttp = httpRq;
    this.apiKey = 'CcywV7UImabTBoggdBANpxPNs1HSFwRw';
    this.serviceUrl = 'https://api.giphy.com/v1/gifs';
    this.endPoint = 'search';
    this._historialBusqueda = [];
    //null, undefined, NaN, '', 0 y false son todos evaluados como false (JavaScript)
    this.resultadosBusquedaApi = (localStorage.getItem('historial'))
      ? this._historialBusqueda = JSON.parse(localStorage.getItem('historial')!) //! al final indica que estoy seguro de que no va a venir nulo por la comprobación previa (pinta error porque estamos usando Angular strict)
      : [];
    //Otra manera de hacer esto último...
    this.resultadosBusquedaApi = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  public get getHistorial(): string[] {
    return [...this._historialBusqueda]; //Uso el operador Spread para romper la relación con el array _historial original para evitar problemas en posibles modificaciones 
  }

  public buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase();
    if (query.length === 0) { //Si viene vacío, no hago nada 
      return;
    }

    if (!this._historialBusqueda.includes(query)) {
      // console.log('se escribió... ', query);
      this._historialBusqueda.unshift(query); //Lo añado al principio del array
      this._historialBusqueda = this._historialBusqueda.splice(0, 10); //Me quedo solo con 10 elementos
      localStorage.setItem('historial', JSON.stringify(this._historialBusqueda));
    }

    // HttpParams define los query params de una petición http (todo lo que viene detrás de ? en la url y cada uno se concatena con &)
    const params = new HttpParams()   
          .set('api_key', this.apiKey)
          .set('limit', '9')
          .set('q', query)

    // console.log(`peticionando ${query} a la API`);
    this.peticionHttp.get<SearchGifsResponse>(`${this.serviceUrl}/${this.endPoint}`, {params})
      .subscribe((respuesta) => { //Esta petición HTTP devuelve un Observable (RxJS)
        console.log('obteniendo respuesta...')
        console.log(respuesta.data);
        this.resultadosBusquedaApi = respuesta.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultadosBusquedaApi));
      });

  }

}
