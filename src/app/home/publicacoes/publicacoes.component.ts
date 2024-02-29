import { CommonModule } from '@angular/common';
import { BdService } from './../../bd-service.service';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PublicacoesComponent implements OnInit {
  private email: string;

  public publicacoes: Array<any> = [];

  constructor(private bd: BdService) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((resp: any) => {
      this.email = resp.email;
      this.atualizarTimeline();
    });
  }

  public atualizarTimeline(): void {
    this.bd.consultaPublicacoes(this.email).then((resp: any) => {
      this.publicacoes = resp;
    });
  }
}
