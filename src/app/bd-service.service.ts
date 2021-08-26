import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor() { }

  public incluirPublicacao(publicacao: any): void {
    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`).push( {
      titulo: publicacao.titulo
    })
  }

}
