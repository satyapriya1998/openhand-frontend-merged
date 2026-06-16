// public-login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-public-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './public-login.html',
  styleUrls: ['./public-login.scss'],
})
export class PublicLogin {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly authService = inject(AuthService);

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  // Login form group
  loginForm: FormGroup = this.fb.group({
    email: ['sam@gmai.com', [Validators.required, Validators.email]],
    password: ['1234567', [Validators.required, Validators.minLength(6)]],
  });

  // Handle form submission
  async submit() {
    await this.handleLogin();
  }

  // Login logic
  // handleLogin(): void {
  //   if (this.loginForm.invalid) {
  //     this.loginForm.markAllAsTouched();
  //     return;
  //   }

  //   const payload = {
  //     email: this.loginForm.value.email,
  //     password: this.loginForm.value.password,
  //   };

  //   console.log('Public login payload', payload);

  //    this.router.navigate([
  //       '/public/onboarding'
  //     ]);

  //   // this.authService.login(payload).subscribe({
  //   //   next: (res) => {
  //   //     console.log('Public Login Success', res);
  //   //       this.router.navigate([
  //   //     '/public/onboarding',
  //   //     'INVITE_ABC_123'
  //   //   ]);
  //   //   },
  //   //   error: (error) => {
  //   //     console.error('Public Login Error', error);
  //   //   },
  //   // });
  // }
  handleLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(payload, true).subscribe({
      next: (res) => {
        console.log('Public Login Success', res);

        this.router.navigate(['/public/onboarding']);
      },

      error: (error) => {
        console.error('Public Login Error', error);
      },
    });
  }
  // Getters for template
  get loginEmail() {
    return this.loginForm.get('email');
  }

  get loginPassword() {
    return this.loginForm.get('password');
  }
}
