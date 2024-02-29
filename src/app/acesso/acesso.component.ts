import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { BannerComponent } from './banner/banner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state(
        'criado',
        style({
          opacity: 1,
        })
      ),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(-50px, 0)',
        }),
        animate('500ms 0s ease-in-out'),
      ]),
    ]),
    trigger('animacao-painel', [
      state(
        'criado',
        style({
          opacity: 1,
        })
      ),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(50px, 0)',
        }),
        animate(
          '1500ms 0s ease-in-out',
          keyframes([
            style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
            style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),

            style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)' }),
            style({ offset: 0.9, opacity: 1, transform: 'translateY(10px)' }),
            style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)' }),
            style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)' }),
          ])
        ),
      ]),
    ]),
  ],
  standalone: true,
  imports: [LoginComponent, CadastroComponent, BannerComponent, CommonModule],
})
export class AcessoComponent implements OnInit {
  public estadoBanner: string = 'criado';
  public estadoPainel: string = 'criado';

  public cadastro: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public exibirPainel(event: string): void {
    this.cadastro = event == 'cadastro' ? true : false;
  }

  public inicioDaAnimacao(): void {}
}
