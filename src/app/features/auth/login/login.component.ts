// login.component.ts
import { Component, inject, signal, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
 private readonly fb =
  inject(FormBuilder);

private readonly router =
  inject(Router);

private readonly route = inject(ActivatedRoute);

readonly authService =
  inject(AuthService);

  // Signals for reactive state
 mode = signal<'login' | 'signup' | 'createTenant'>('login');
 

  forgotOpen = signal(false);
  activeSlide = signal(0);
  private slideInterval: any;

    faEye = faEye;
faEyeSlash = faEyeSlash;

showPassword = false;
showConfirmPassword = false;

  // Carousel slides data
// Update your slides array definition to include the missing properties
slides = [
  {
    title: 'AI-Powered Workforce Analytics',
    titleShort: 'Analytics',
    desc: 'Make data-driven decisions with real-time insights into team performance, engagement, and productivity trends.',
    icon: 'analytics',
    dotLabel: 'Analytics'
  },
  {
    title: 'Enterprise-Grade Security',
    titleShort: 'Security',
    desc: 'Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards to protect your sensitive data.',
    icon: 'shield',
    dotLabel: 'Security'
  },
  {
    title: 'Seamless Team Collaboration',
    titleShort: 'Collaboration',
    desc: 'Break down silos with integrated tools that connect HR, managers, and employees in one unified platform.',
    icon: 'users',
    dotLabel: 'Collaboration'
  },
  {
    title: 'Smart Automation Engine',
    titleShort: 'Automation',
    desc: 'Eliminate manual tasks with intelligent workflows that automate onboarding, reviews, and compliance checks.',
    icon: 'automation',
    dotLabel: 'Automation'
  },
  {
    title: 'Rapid Deployment',
    titleShort: 'Rapid',
    desc: 'Go from zero to fully operational in days, not months, with our plug-and-play infrastructure.',
    icon: 'rocket',
    dotLabel: 'Deployment'
  }
];

subscriptionModels = [
  'Starter',
  'Professional',
  'Enterprise'
];


  constructor( ) {

  }

  // Login form group
  loginForm: FormGroup = this.fb.group({
    email: ['john@email.com', [Validators.required, Validators.email]],
    password: ['123467', [Validators.required, Validators.minLength(6)]],

  });

  // Signup form group
  signupForm: FormGroup = this.fb.group({
    firstName: ['', [
    Validators.required,
    Validators.minLength(2)
  ]],

  lastName: ['', [
    Validators.required,
    Validators.minLength(2)
  ]],

  email: ['', [
    Validators.required,
    Validators.email
  ]],

  phoneNumber: ['', [
    Validators.pattern(/^[0-9]{10}$/)
  ]],

  password: ['', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(100)
  ]],

  confirmPassword: ['', Validators.required],

  status: [1],
  isEmailVerified: [false],
  failedLoginAttempts: [0],
  isDeleted: [false]
  }, {
    validators: this.passwordMatchValidator
  });

  tenantForm: FormGroup = this.fb.group({
  tenantName: ['', [
    Validators.required,
    Validators.minLength(2)
  ]],

  tenantSubdomain: ['', [
    Validators.required,
    Validators.pattern(/^[a-z0-9-]+$/)
  ]],

  subscriptionModel: ['', Validators.required],

  employeeCount: ['', [
    Validators.required,
    Validators.min(1)
  ]]
});

  // Forgot password form
  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
    // Handle mode query parameter for direct navigation to login/signup
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'signup') {
        this.mode.set('signup');
      } else if (params['mode'] === 'login') {
        this.mode.set('login');
      }
    });
    
    // Auto-rotate carousel every 4.5 seconds
    this.slideInterval = setInterval(() => {
      this.activeSlide.update(i => (i + 1) % this.slides.length);
    }, 4500);
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // Custom validator for password match
 passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword
    ? null
    : { mismatch: true };
}

  // Switch between login and signup modes
  switchMode() {
    this.mode.update(m => m === 'login' ? 'signup' : 'login');
    // this.err.set('');
    // Reset forms
    this.loginForm.markAsUntouched();
    this.signupForm.markAsUntouched();
  }

  // Handle form submission based on mode
 async submit() {
  if (this.mode() === 'login') {
    await this.handleLogin();
  } else if (this.mode() === 'signup') {
    await this.handleSignup();
  } else if (this.mode() === 'createTenant') {
    await this.handleCreateTenant();
  }
}

  // Login logic
handleLogin(): void {

  if (this.loginForm.invalid) {

    this.loginForm.markAllAsTouched();

    return;
  }

  const payload = {

    email:
      this.loginForm.value.email,

    password:
      this.loginForm.value.password,
  };

  console.log('login payload', payload);
  
  this.authService
    .login(payload)
    .subscribe({

      next: (res) => {

        console.log(
          'Login Success', res
        );



        // NO NEED:
        // router.navigate()

        // AuthService already redirects
        // based on tenant subdomain
      },

      error: (error) => {

        console.error(
          'Login Error',
          error
        );
      },
    });
}


  // Signup logic
handleSignup(): void {

  if (this.signupForm.invalid) {

    this.signupForm.markAllAsTouched();

    return;
  }

  const payload = {

    firstName:
      this.signupForm.value.firstName,

    lastName:
      this.signupForm.value.lastName,

    email:
      this.signupForm.value.email,

    password:
      this.signupForm.value.password,

    phoneNumber:
      this.signupForm.value.phoneNumber,

    status:
      this.signupForm.value.status,

    isEmailVerified: false,

    failedLoginAttempts: 0,

    isDeleted: false,
  };

  this.authService
    .signup(payload)
    .subscribe({

      next: () => {

        // MOVE TO TENANT SCREEN

        this.mode.set(
          'createTenant'
        );
      },

      error: (error) => {

        console.error(
          'Signup Error',
          error
        );
      },
    });
}

  async handleCreateTenant() {
    console.log('tenant value', this.tenantForm.value);
    
  if (this.tenantForm.invalid) {
    this.tenantForm.markAllAsTouched();
    return;
  }

  // this.loading.set(true);
  // this.err.set('');

  console.log('Create Tenant Form:', this.tenantForm.value);

  setTimeout(() => {
    // this.loading.set(false);

    // Navigate after tenant creation
    this.router.navigate(['/dashboard']);
  }, 1000);
}


  // Handle forgot password
  async handleForgotPassword() {
    // if (this.forgotForm.invalid) {
    //   this.forgotForm.markAllAsTouched();
    //   return;
    // }

    // this.loading.set(true);

    // try {
    //   const { email } = this.forgotForm.value;
    //   // await this.auth.forgotPassword(email);
    //   this.forgotOpen.set(false);
    //   this.forgotForm.reset();
    //   // Show success message (you can add a toast notification here)
    //   console.log('Password reset email sent');
    // } catch (error: any) {
    //   this.err.set(error?.message || 'Failed to send reset link');
    // } finally {
    //   this.loading.set(false);
    // }
  }

  // Social login handlers
  async googleLogin() {
    // this.loading.set(true);
    // try {
    //   await this.auth.loginWithGoogle();
    //   this.router.navigate(['/dashboard']);
    // } catch (error: any) {
    //   this.err.set(error?.message || 'Google login failed');
    // } finally {
    //   this.loading.set(false);
    // }
  }

  async xLogin() {
    // this.loading.set(true);
    // try {
    //   await this.auth.loginWithX();
    //   this.router.navigate(['/dashboard']);
    // } catch (error: any) {
    //   this.err.set(error?.message || 'X login failed');
    // } finally {
    //   this.loading.set(false);
    // }
  }

  // Getters for template
get loginEmail() {
  return this.loginForm.get('email');
}

get loginPassword() {
  return this.loginForm.get('password');
}

get signupFirstName() {
  return this.signupForm.get('firstName');
}

get signupLastName() {
  return this.signupForm.get('lastName');
}

get signupEmail() {
  return this.signupForm.get('email');
}

get signupPhoneNumber() {
  return this.signupForm.get('phoneNumber');
}

get signupPassword() {
  return this.signupForm.get('password');
}

get signupConfirm() {
  return this.signupForm.get('confirmPassword');
}

get forgotEmail() {
  return this.forgotForm.get('email');
}


get tenantName() {
  return this.tenantForm.get('tenantName');
}

get tenantSubdomain() {
  return this.tenantForm.get('tenantSubdomain');
}

get tenantSubscription() {
  return this.tenantForm.get('subscriptionModel');
}

get tenantEmployeeCount() {
  return this.tenantForm.get('employeeCount');
}
}