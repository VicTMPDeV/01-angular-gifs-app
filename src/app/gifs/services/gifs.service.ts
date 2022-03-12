import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  
  public get getHistorial() : string[] {
    return [...this._historial]; //Uso el operador Spread para romper la relación con el array _historial original para evitar problemas en posibles modificaciones 
  }

  public buscarGifs( query: string){
    this._historial.unshift(query);
    console.log(this.getHistorial);
  }
  
}
