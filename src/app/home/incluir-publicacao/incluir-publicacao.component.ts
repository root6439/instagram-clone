import { FormControl } from '@angular/forms';
import { ProgressoService } from './../../progresso.service';
import { BdService } from './../../bd-service.service';

import firebase from 'firebase/app';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import 'firebase/database';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css'],
  standalone: true,
})
export class IncluirPublicacaoComponent implements OnInit {
  @Output()
  public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>();

  private email: string;
  private imagem: any;
  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: number = 0;

  titulo = new FormControl('');

  constructor(
    private bd: BdService,
    private progressoService: ProgressoService
  ) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bd.incluirPublicacao({
      titulo: this.titulo.value,
      email: this.email,
      imagem: this.imagem,
    });

    let acompanhamentoUpload = interval(500);
    let continua = new Subject();
    let limitador = acompanhamentoUpload.pipe(takeUntil(continua));

    continua.next(true);
    limitador.subscribe(() => {
      this.porcentagemUpload = Math.round(
        (this.progressoService.estado.bytesTransferred /
          this.progressoService.estado.totalBytes) *
          100
      );
      this.progressoPublicacao = 'andamento';
      if (this.progressoService.status == 'concluido') {
        continua.next(false);
        this.progressoPublicacao = 'concluido';
        this.atualizarTimeLine.emit();
      }
    });
  }

  public uploadImagem(value: Event): void {
    this.imagem = (<HTMLInputElement>value.target).files[0];
  }
}
