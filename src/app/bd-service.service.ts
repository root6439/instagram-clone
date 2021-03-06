import { ProgressoService } from './progresso.service';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import "firebase/storage";
import "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(
    private progressoService: ProgressoService
  ) { }

  public incluirPublicacao(publicacao: any): void {

    let nomeImagem: number = Date.now()

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`).push({
      titulo: publicacao.titulo,
      imagem: nomeImagem
    }).then((resp: any) => {
      nomeImagem = resp.key;

      firebase.storage().ref().child(`imagens/${nomeImagem}`).put(publicacao.imagem)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: any) => {
            this.progressoService.status = 'andamento';
            this.progressoService.estado = snapshot;
          },
          (err: any) => {
            this.progressoService.status = 'erro';
          },
          () => {
            this.progressoService.status = 'concluido';
          }
        )
    })
  }

  public consultaPublicacoes(email: string): Promise<any> {

    return new Promise((resolve, reject) => {
      firebase.database().ref(`publicacoes/${btoa(email)}`).once('value').then((snapshot: any) => {

        let publicacoes: Array<any> = [];

        snapshot.forEach((childSnapchot: any) => {
          let publicacao: any = childSnapchot.val()
          publicacao.key = childSnapchot.key;
          publicacoes.push(publicacao);
        });
        return publicacoes.reverse();

      }).then((publicacoes: any) => {

        publicacoes.forEach((pub: any) => {
          firebase.storage().ref().child(`imagens/${pub.key}`).getDownloadURL()
            .then((url: string) => {
              pub.urlImagem = url;
              firebase.database().ref(`usuario_detalhe/${btoa(email)}`).orderByKey().once('value')
                .then((snapshot: any) => {
                  pub.nomeUsuario = snapshot.val().nomeDeUsuario;
                })
            })
        });
        resolve(publicacoes);
      })
    })

  }

}

 // let publicacao: any = childSnapchot.val()

          // firebase.storage().ref().child(`imagens/${childSnapchot.key}`).getDownloadURL()
          //   .then((url: string) => {
          //     publicacao.urlImagem = url;
          //     firebase.database().ref(`usuario_detalhe/${btoa(email)}`).orderByKey().once('value')
          //       .then((snapshot: any) => {
          //         publicacao.nomeUsuario = snapshot.val().nomeDeUsuario;
          //         publicacoes.push(publicacao);
          //       })
          //   })