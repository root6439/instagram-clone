import { ProgressoService } from './../../progresso.service';
import { BdService } from './../../bd-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { interval, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  private email: string;
  private imagem: any;
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number = 0;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [Validators.required])
  })

  constructor(
    private bd: BdService,
    private progressoService: ProgressoService
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  public publicar(): void {
    this.bd.incluirPublicacao({
      titulo: this.formulario.value.titulo,
      email: this.email,
      imagem: this.imagem
    });

    let acompanhamentoUpload = interval(500);
    let continua = new Subject();
    let limitador = acompanhamentoUpload.pipe(takeUntil(continua))

    continua.next(true)
    limitador.subscribe(() => {
      this.porcentagemUpload = Math.round((this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes) * 100)
      console.log(this.progressoService);
      this.progressoPublicacao = 'andamento';
      if (this.progressoService.status == 'concluido') {
        continua.next(false);
        this.progressoPublicacao = 'concluido';
      }
    })

  }

  public uploadImagem(value: Event): void {

    this.imagem = (<HTMLInputElement>value.target).files[0];

  }

}
