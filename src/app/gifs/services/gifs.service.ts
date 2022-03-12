import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'CcywV7UImabTBoggdBANpxPNs1HSFwRw';
  private _historial: string[] = [];

  public get getHistorial() : string[] {
    return [...this._historial]; //Uso el operador Spread para romper la relación con el array _historial original para evitar problemas en posibles modificaciones 
  }
  
  public buscarGifs( query: string ){

    query = query.trim().toLocaleLowerCase();
    if( query.length === 0 ){ //Si viene vacío, no hago nada 
      return;
    }
    if( !this._historial.includes(query) ){
      this._historial.unshift(query); //Lo añado al principio del array
      this._historial = this._historial.splice(0,10); //Me quedo solo con 10 elementos
      console.log(this.getHistorial);
    }
  }
  
}
