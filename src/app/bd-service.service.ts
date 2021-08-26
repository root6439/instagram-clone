import { ProgressoService } from './progresso.service';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(
    private progressoService: ProgressoService
  ) { }

  public incluirPublicacao(publicacao: any): void {

    let nomeImagem: number = Date.now()

    firebase.storage().ref().child(`imagens/${nomeImagem}`).put(publicacao.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED, 
        (snapshot: any) => {
          this.progressoService.status = 'andamento'
          this.progressoService.estado = snapshot;
        }, 
        (err: any) => {
          this.progressoService.status = 'erro'
        },
        () => {
          this.progressoService.status = 'concluido'
        }
      )

    // firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`).push( {
    //   titulo: publicacao.titulo
    // })
  }

}
