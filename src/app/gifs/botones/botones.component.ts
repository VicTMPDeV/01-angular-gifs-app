import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html'
})
export class BotonesComponent{

  constructor(private gifsService: GifsService) { }

  public cargarAnterior(){
    //TODO -> Use Gif Service to implement pagination from API
  }

  public cargarSiguiente(){
    //TODO -> Use Gif Service to implement pagination from API
  }

  public pagActual(){
    //TODO -> Use Gif Service to implement pagination from API
  }

}
