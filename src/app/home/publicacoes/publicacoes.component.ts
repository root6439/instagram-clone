import { BdService } from './../../bd-service.service';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  private email: string;

  constructor(
    private bd: BdService
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((resp: any) => {
      this.email = resp.email;
      this.atualizarTimeline();
    })
  }

  public atualizarTimeline(): void {
    this.bd.consultaPublicacoes(this.email);
  }

}
