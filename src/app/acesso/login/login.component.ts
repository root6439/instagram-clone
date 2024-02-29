import { AuthService } from './../../auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public erroLogin: boolean;

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: UntypedFormGroup = new UntypedFormGroup({
    'email': new UntypedFormControl(null, [Validators.required, Validators.email]),
    'senha': new UntypedFormControl(null, [Validators.required])
  })

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public login(): void {
    this.authService.login(
      this.formulario.value.email,
      this.formulario.value.senha
    );
  }

  public verificaErroLogin(): string {
    this.erroLogin = true;
    return this.authService.erroLogin;
  }

}
