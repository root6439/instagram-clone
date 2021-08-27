import { PublicacoesComponent } from './publicacoes/publicacoes.component';
import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes')
  public appPublicacoes: PublicacoesComponent;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public sair(): void {
    this.authService.sair();
  }

  public atualizarFeed(): void {
    this.appPublicacoes.atualizarTimeline();
  }

}
