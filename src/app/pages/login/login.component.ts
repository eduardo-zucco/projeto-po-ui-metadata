import { Component, OnInit } from '@angular/core';
import { PoFieldModule, PoNotification, PoNotificationService } from '@po-ui/ng-components';
import { CommonModule } from '@angular/common';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services/AuthService/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [PoFieldModule, PoPageLoginModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private poNotification: PoNotificationService ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
    });
  }

  goToRegister(){
    this.router.navigate(['/loginCadastro'])
  }



  onSubmit() {
    if (this.form.invalid) return;

    const email = this.form.value.email!;
    this.auth.login({ email }).subscribe({
      next: (res) => {
        if (res.authenticated) {
          this.auth.saveToken(res.accessToken);
          this.router.navigate(['/home']);
        } else {
          this.poNotification.error('Usuário não encontrado. Tente Novamente')
        }
      },
      error: (err) => {
        alert('Erro no login: ' + (err.error?.message || 'Desconhecido'));
      }
    });

  }

}
