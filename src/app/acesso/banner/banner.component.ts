import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        'opacity': 0
      })), 
      state('visivel', style({
        'opacity': 1
      })), 
      transition('escondido => visivel', animate('2s ease-in')),
      transition('visivel => escondido', animate('2s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string  = 'escondido';

  constructor() { }

  ngOnInit(): void {
  }

  toogleEstadoAnimacao(): void {
    this.estado = 'visivel'
  }

}
