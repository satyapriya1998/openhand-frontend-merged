import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { EmployeeAddressDto } from '../../../core/api/organization';
import { OnboardingManagementService } from '../../../core/services/onboarding-management.service';
import {
  faMapLocationDot,
  faPen,
  faXmark,
  faFileArrowUp,
  faFile,
  faEye,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PageSubHeader } from '../../../shared/components/page-sub-header/page-sub-header';
import { PageHeader } from '../../../shared/components/page-header/page-header.component';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-public-address',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PageSubHeader,
    Breadcrumbs,
    PageHeader,
  ],
  templateUrl: './public-address.html',
  styleUrls: ['../../public.style.scss'],
})
export class PublicAddress {
  private readonly onboardingService = inject(OnboardingManagementService);

  employeeId = '019ebb39-b226-747e-85a3-6cec79038463';
  /* =====================================================
     ICONS
  ===================================================== */

  readonly faMapLocationDot = faMapLocationDot;
  readonly faPen = faPen;
  readonly faXmark = faXmark;
  readonly faFileArrowUp = faFileArrowUp;
  readonly faFile = faFile;
  readonly faEye = faEye;
  readonly faTrash = faTrash;

  /* =====================================================
     STATE
  ===================================================== */

  readonly isSaved = signal(false);
  readonly isEditMode = signal(true);

  readonly uploadedDocuments = signal<
    {
      name: string;
      size: string;
      type: string;
      url: string;
    }[]
  >([]);

  readonly documentError = signal('');

  readonly allowedDocumentTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];

  readonly maxDocumentSize = 5 * 1024 * 1024;

  /* =====================================================
     FORM
  ===================================================== */

  readonly addressForm: FormGroup;

  readonly isFormValid = computed(() => this.addressForm.valid);

  /* =====================================================
     CONSTRUCTOR
  ===================================================== */

  constructor(private readonly fb: FormBuilder) {
    this.addressForm = this.fb.group({
      currentAddressLine1: ['', [Validators.required, Validators.maxLength(150)]],
      currentAddressLine2: ['', [Validators.maxLength(150)]],
      currentCity: ['', [Validators.required, Validators.maxLength(60)]],
      currentState: ['', [Validators.required, Validators.maxLength(60)]],
      currentCountry: ['', [Validators.required, Validators.maxLength(60)]],
      currentPostalCode: ['', [Validators.required, Validators.maxLength(20)]],

      sameAsCurrent: [false],

      permanentAddressLine1: ['', [Validators.required, Validators.maxLength(150)]],
      permanentAddressLine2: ['', [Validators.maxLength(150)]],
      permanentCity: ['', [Validators.required, Validators.maxLength(60)]],
      permanentState: ['', [Validators.required, Validators.maxLength(60)]],
      permanentCountry: ['', [Validators.required, Validators.maxLength(60)]],
      permanentPostalCode: ['', [Validators.required, Validators.maxLength(20)]],
    });

    this.addressForm.get('sameAsCurrent')?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.copyCurrentAddress();
      }
    });
  }

  /* =====================================================
     SAVE
  ===================================================== */

  // saveAddress(): void {
  //   this.addressForm.markAllAsTouched();

  //   if (this.addressForm.invalid) {
  //     return;
  //   }

  //   console.log({
  //     ...this.addressForm.getRawValue(),
  //     documents: this.uploadedDocuments(),
  //   });

  //   this.isSaved.set(true);
  //   this.isEditMode.set(false);
  //   this.addressForm.disable();
  // }
  saveAddress(): void {
    this.addressForm.markAllAsTouched();

    if (this.addressForm.invalid) {
      return;
    }

    const payload: EmployeeAddressDto = {
      addressLine1: this.addressForm.value.currentAddressLine1,
      addressLine2: this.addressForm.value.currentAddressLine2,
      city: this.addressForm.value.currentCity,
      state: this.addressForm.value.currentState,
      country: this.addressForm.value.currentCountry,
      postalCode: this.addressForm.value.currentPostalCode,
    };

    this.onboardingService.saveAddress(this.employeeId, payload).subscribe({
      next: () => {
        this.isSaved.set(true);
        this.isEditMode.set(false);
        this.addressForm.disable();

        console.log('Address saved successfully');
      },
      error: (error) => {
        console.error('Address save failed', error);
      },
    });
  }
  /* =====================================================
     RESET
  ===================================================== */

  resetForm(): void {
    this.addressForm.reset();
    this.uploadedDocuments.set([]);
    this.documentError.set('');
  }

  /* =====================================================
     EDIT
  ===================================================== */

  enableEdit(): void {
    this.isEditMode.set(true);
    this.addressForm.enable();
  }

  cancelEdit(): void {
    this.isEditMode.set(false);
    this.addressForm.disable();
  }

  /* =====================================================
     SAME AS CURRENT
  ===================================================== */

  copyCurrentAddress(): void {
    this.addressForm.patchValue({
      permanentAddressLine1: this.addressForm.get('currentAddressLine1')?.value,
      permanentAddressLine2: this.addressForm.get('currentAddressLine2')?.value,
      permanentCity: this.addressForm.get('currentCity')?.value,
      permanentState: this.addressForm.get('currentState')?.value,
      permanentCountry: this.addressForm.get('currentCountry')?.value,
      permanentPostalCode: this.addressForm.get('currentPostalCode')?.value,
    });
  }

  /* =====================================================
     DOCUMENTS
  ===================================================== */

  onDocumentUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files?.length) {
      return;
    }

    this.documentError.set('');

    const docs = [...this.uploadedDocuments()];

    for (const file of Array.from(files)) {
      if (!this.allowedDocumentTypes.includes(file.type)) {
        this.documentError.set('Only PDF, PNG, JPG and JPEG files are allowed');
        continue;
      }

      if (file.size > this.maxDocumentSize) {
        this.documentError.set('File size must be less than 5MB');
        continue;
      }

      docs.push({
        name: file.name,
        size: this.formatFileSize(file.size),
        type: file.type,
        url: URL.createObjectURL(file),
      });
    }

    this.uploadedDocuments.set(docs);

    input.value = '';
  }

  removeDocument(index: number): void {
    const docs = [...this.uploadedDocuments()];
    docs.splice(index, 1);
    this.uploadedDocuments.set(docs);
  }

  viewDocument(url: string): void {
    window.open(url, '_blank');
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  /* =====================================================
     VALIDATION
  ===================================================== */

  isInvalid(controlName: string): boolean {
    const control = this.addressForm.get(controlName);

    return !!(control && control.invalid && control.touched);
  }

  getError(controlName: string): string {
    const control = this.addressForm.get(controlName);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('maxlength')) {
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed`;
    }

    return 'Invalid field';
  }
}
