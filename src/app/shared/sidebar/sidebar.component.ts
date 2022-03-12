import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  constructor( private gifsService: GifsService ) { }

  public get getHistorial() : string[] {
    return this.gifsService.getHistorial;
  }
  
}
