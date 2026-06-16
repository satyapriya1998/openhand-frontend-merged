import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnboardingManagementService } from '../../../core/services/onboarding-management.service';
import {
  EmployeePersonalDetailsDto,
  EmployeeIdentityInfoDto,
} from '../../../core/api/organization';
import {
  faBuilding,
  faFileShield,
  faGear,
  faUser,
  faPen,
  faXmark,
  faIdCard,
  faPassport,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';

import { faBell } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PageSubHeader } from '../../../shared/components/page-sub-header/page-sub-header';

import { PageHeader } from '../../../shared/components/page-header/page-header.component';

import { ThemeService } from '../../../core/theme/theme.service';
import { HRMS_THEMES } from '../../../core/theme/theme.config';

import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-public-personal-info',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PageSubHeader,
    Breadcrumbs,
    PageHeader,
  ],
  templateUrl: './public-personal-info.html',
  styleUrls: ['../../public.style.scss'],
})
export class PublicPersonalInfo {
  private readonly onboardingService = inject(OnboardingManagementService);

  employeeId = '019ebb39-b226-747e-85a3-6cec79038463';
  /* =====================================================
     ICONS
  ===================================================== */

  private saveIdentityInfo(): void {
    const payload: EmployeeIdentityInfoDto = {
      aadhaarNumber: this.personalForm.value.aadharNumber,
      panNumber: this.personalForm.value.panNumber,
      passportNumber: this.personalForm.value.passportNumber,
      drivingLicenseNumber: this.personalForm.value.drivingLicenseNumber,
      voterId: this.personalForm.value.voterIdNumber,
    };

    this.onboardingService.saveIdentityInfo(this.employeeId, payload).subscribe({
      next: () => {
        this.isSaved.set(true);
        this.isEditMode.set(false);
        this.isIdentityVerified.set(true);
        this.verificationStatus.set('verified');
        this.personalForm.disable();
      },
      error: (error) => {
        console.error('Identity save failed', error);
      },
    });
  }

  readonly faGear = faGear;
  readonly faBell = faBell;
  readonly faUser = faUser;
  readonly faBuilding = faBuilding;
  readonly faFileShield = faFileShield;

  readonly faIdCard = faIdCard;
  readonly faPassport = faPassport;
  readonly faAddressCard = faAddressCard;
  faPen = faPen;
  faXmark = faXmark;

  /* =====================================================
     STATE
  ===================================================== */

  readonly isSaved = signal(false);
  readonly isEditMode = signal(true);
  readonly photoPreview = signal<string | null>(null);
  readonly photoError = signal('');

  // Dropdown states
  readonly genderDropdownOpen = signal(false);
  readonly maritalStatusDropdownOpen = signal(false);
  readonly nationalityDropdownOpen = signal(false);

  readonly selectedTheme = signal('oceanBlue');

  // Identity verification documents state
  readonly isIdentityVerified = signal(false);
  readonly verificationStatus = signal<'pending' | 'verified' | 'rejected'>('pending');

  readonly allowedPhotoTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  readonly maxPhotoSize = 2 * 1024 * 1024; // 2MB

  // Genders
  readonly genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'preferNotToSay', label: 'Prefer not to say' },
  ];

  // Marital Statuses
  readonly maritalStatuses = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' },
  ];

  // Nationalities
  readonly nationalities = [
    { value: 'indian', label: 'Indian' },
    { value: 'american', label: 'American' },
    { value: 'british', label: 'British' },
    { value: 'canadian', label: 'Canadian' },
    { value: 'australian', label: 'Australian' },
    { value: 'german', label: 'German' },
    { value: 'french', label: 'French' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'other', label: 'Other' },
  ];

  /* =====================================================
     FORM
  ===================================================== */

  readonly personalForm: FormGroup;

  readonly isFormValid = computed(() => this.personalForm.valid && this.photoPreview() !== null);

  /* =====================================================
     CONSTRUCTOR
  ===================================================== */

  constructor(private readonly fb: FormBuilder) {
    this.personalForm = this.fb.group({
      // Personal Information
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z\s\-']+$/),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z\s\-']+$/),
        ],
      ],
      personalEmail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{8,20}$/)]],
      dateOfBirth: ['', [Validators.required, this.ageValidator.bind(this)]],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      nationality: ['', Validators.required],

      // Identity Verification
      aadharNumber: [
        '',
        [Validators.pattern(/^[0-9]{12}$/), Validators.minLength(12), Validators.maxLength(12)],
      ],
      panNumber: [
        '',
        [
          Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      passportNumber: [
        '',
        [Validators.pattern(/^[A-Z0-9]{6,9}$/), Validators.minLength(6), Validators.maxLength(9)],
      ],
      drivingLicenseNumber: ['', [Validators.minLength(8), Validators.maxLength(16)]],
      voterIdNumber: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      ssnNumber: ['', [Validators.pattern(/^[0-9]{3}-[0-9]{2}-[0-9]{4}$|^[0-9]{9}$/)]],
    });
  }

  ageValidator(control: any): { [key: string]: boolean } | null {
    if (!control.value) return null;

    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      return { underage: true };
    }
    if (age > 100) {
      return { overage: true };
    }
    return null;
  }

  /* =====================================================
     SAVE
  ===================================================== */

  savePersonalInfo(): void {
    this.personalForm.markAllAsTouched();

    if (this.personalForm.invalid) {
      return;
    }

    const personalPayload: EmployeePersonalDetailsDto = {
      lastName: this.personalForm.value.lastName,
      placeOfBirth: '',
      gender: this.mapGender(),
      maritalStatus: this.mapMaritalStatus(),
      nationality: this.personalForm.value.nationality,
    };

    this.onboardingService.savePersonalDetails(this.employeeId, personalPayload).subscribe({
      next: () => {
        this.saveIdentityInfo();
      },
      error: (error) => {
        console.error('Personal details save failed', error);
      },
    });
  }

  private mapGender(): number {
    switch (this.personalForm.value.gender) {
      case 'male':
        return 1;
      case 'female':
        return 2;
      default:
        return 3;
    }
  }

  private mapMaritalStatus(): number {
    switch (this.personalForm.value.maritalStatus) {
      case 'single':
        return 1;
      case 'married':
        return 2;
      case 'divorced':
        return 3;
      default:
        return 4;
    }
  }
  /* =====================================================
     RESET
  ===================================================== */

  resetForm(): void {
    this.personalForm.reset();
    this.photoPreview.set(null);
    this.photoError.set('');
  }

  /* =====================================================
     EDIT
  ===================================================== */

  enableEdit(): void {
    this.isEditMode.set(true);
    this.personalForm.enable();
    this.isIdentityVerified.set(false);
    this.verificationStatus.set('pending');
  }

  cancelEdit(): void {
    this.isEditMode.set(false);
    this.personalForm.disable();
  }

  /* =====================================================
     LOGO
  ===================================================== */

  onPhotoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.photoError.set('');

    if (!this.allowedPhotoTypes.includes(file.type)) {
      this.photoError.set('Only PNG, JPG and JPEG files are allowed');
      input.value = '';
      return;
    }

    if (file.size > this.maxPhotoSize) {
      this.photoError.set('Photo size must be less than 2MB');
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  /* =====================================================
     DROPDOWNS
  ===================================================== */

  toggleGenderDropdown(): void {
    this.genderDropdownOpen.update((v) => !v);
    this.maritalStatusDropdownOpen.set(false);
    this.nationalityDropdownOpen.set(false);
  }

  selectGender(value: string, event: Event): void {
    event.stopPropagation();
    this.personalForm.patchValue({ gender: value });
    this.personalForm.get('gender')?.markAsTouched();
    this.genderDropdownOpen.set(false);
  }

  toggleMaritalStatusDropdown(): void {
    this.maritalStatusDropdownOpen.update((v) => !v);
    this.genderDropdownOpen.set(false);
    this.nationalityDropdownOpen.set(false);
  }

  selectMaritalStatus(value: string, event: Event): void {
    event.stopPropagation();
    this.personalForm.patchValue({ maritalStatus: value });
    this.personalForm.get('maritalStatus')?.markAsTouched();
    this.maritalStatusDropdownOpen.set(false);
  }

  toggleNationalityDropdown(): void {
    this.nationalityDropdownOpen.update((v) => !v);
    this.genderDropdownOpen.set(false);
    this.maritalStatusDropdownOpen.set(false);
  }

  selectNationality(value: string, event: Event): void {
    event.stopPropagation();
    this.personalForm.patchValue({ nationality: value });
    this.personalForm.get('nationality')?.markAsTouched();
    this.nationalityDropdownOpen.set(false);
  }

  /* =====================================================
     THEME
  ===================================================== */

  selectTheme(theme: string): void {
    this.selectedTheme.set(theme);
  }

  getFormattedTheme(): string {
    const theme = this.selectedTheme();
    return theme.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
  }

  /* =====================================================
     VALIDATION
  ===================================================== */

  isInvalid(controlName: string): boolean {
    const control = this.personalForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  getError(controlName: string): string {
    const control = this.personalForm.get(controlName);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('email')) {
      return 'Enter a valid email address';
    }

    if (control.hasError('minlength')) {
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    }

    if (control.hasError('maxlength')) {
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed`;
    }

    if (control.hasError('pattern')) {
      switch (controlName) {
        case 'firstName':
        case 'lastName':
          return 'Only letters, spaces, hyphens and apostrophes allowed';
        case 'phoneNumber':
          return 'Enter a valid phone number';
        case 'personalEmail':
          return 'Enter a valid email address';
        case 'aadharNumber':
          return 'Enter a valid 12-digit Aadhar number';
        case 'panNumber':
          return 'Enter a valid PAN number (e.g., ABCDE1234F)';
        case 'passportNumber':
          return 'Enter a valid passport number (6-9 alphanumeric characters)';
        case 'ssnNumber':
          return 'Enter a valid SSN (format: 123-45-6789 or 123456789)';
        default:
          return 'Invalid format';
      }
    }

    if (control.hasError('underage')) {
      return 'You must be at least 18 years old';
    }

    if (control.hasError('overage')) {
      return 'Age cannot exceed 100 years';
    }

    return 'Invalid field';
  }

  // Helper method to get label for dropdown values
  getGenderLabel(value: string): string {
    const gender = this.genders.find((g) => g.value === value);
    return gender ? gender.label : 'Select Gender';
  }

  getMaritalStatusLabel(value: string): string {
    const status = this.maritalStatuses.find((m) => m.value === value);
    return status ? status.label : 'Select Marital Status';
  }

  getNationalityLabel(value: string): string {
    const nationality = this.nationalities.find((n) => n.value === value);
    return nationality ? nationality.label : 'Select Nationality';
  }

  // Format date for display
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
