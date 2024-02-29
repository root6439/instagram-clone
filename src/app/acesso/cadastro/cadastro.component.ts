import { AuthService } from './../../auth.service';
import { Usuario } from './../usuario.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: UntypedFormGroup = new UntypedFormGroup({
    'email': new UntypedFormControl(null, [Validators.required, Validators.email]),
    'nomeDeUsuario': new UntypedFormControl(null, [Validators.required]),
    'nomeCompleto': new UntypedFormControl(null, [Validators.required]),
    'senha': new UntypedFormControl(null, [Validators.required])
  })

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
   
    let usuario: Usuario = this.formulario.value;
    
    this.authService.cadastrarUsuario(usuario).then(() => {
      this.exibirPainelLogin();
    })

  }

}
