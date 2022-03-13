import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'CcywV7UImabTBoggdBANpxPNs1HSFwRw';
  private _historial: string[] = [];
  public resultados: any[] = [];

  constructor( private http: HttpClient ) {}

  public get getHistorial() : string[] {
    return [...this._historial]; //Uso el operador Spread para romper la relación con el array _historial original para evitar problemas en posibles modificaciones 
  }
  
  public buscarGifs( query: string ){

    query = query.trim().toLocaleLowerCase();
    if( query.length === 0 ){ //Si viene vacío, no hago nada 
      return;
    }
    if( !this._historial.includes(query) ){
      console.log('se escribió... ', query);
      this._historial.unshift(query); //Lo añado al principio del array
      this._historial = this._historial.splice(0,10); //Me quedo solo con 10 elementos
    }

    console.log(`peticionando ${query} a la API`);
    
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=CcywV7UImabTBoggdBANpxPNs1HSFwRw&q=${query}&limit=15`)
      .subscribe(( resp:any ) => { //Esta petición HTTP devuelve un Observable (RxJS)
        console.log('obteniendo respuesta...')
        console.log(resp.data);
        this.resultados = resp.data;
      });

  }
  
}
