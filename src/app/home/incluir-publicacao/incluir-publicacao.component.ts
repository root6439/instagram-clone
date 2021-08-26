import { BdService } from './../../bd-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  private email: string;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [ Validators.required ])
  })

  constructor(
    private bd: BdService
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  public publicar(): void {
    this.bd.incluirPublicacao({
      titulo: this.formulario.value.titulo,
      email: this.email
    });
  }

 

}
