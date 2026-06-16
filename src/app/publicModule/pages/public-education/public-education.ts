import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { OnboardingManagementService } from '../../../core/services/onboarding-management.service';
import { EmployeeEducationDto } from '../../../core/api/organization';
import {
  faGraduationCap,
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
  selector: 'app-public-education',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PageSubHeader,
    Breadcrumbs,
    PageHeader,
  ],
  templateUrl: './public-education.html',
  styleUrls: ['../../public.style.scss'],
})
export class PublicEducation {
  /* =====================================================
     ICONS
  ===================================================== */
  private readonly onboardingService = inject(OnboardingManagementService);

  employeeId = '9e7d29d9-6381-48d1-8c04-ea1346213e17';
  readonly faGraduationCap = faGraduationCap;
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

  readonly qualificationDropdownOpen = signal(false);

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

  readonly qualificationLevels = [
    { value: 'highschool', label: 'High School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor', label: 'Bachelor Degree' },
    { value: 'master', label: 'Master Degree' },
    { value: 'doctorate', label: 'Doctorate / PhD' },
    { value: 'professional', label: 'Professional Certification' },
  ];

  /* =====================================================
     FORM
  ===================================================== */

  readonly educationForm: FormGroup;

  readonly isFormValid = computed(() => this.educationForm.valid);

  /* =====================================================
     CONSTRUCTOR
  ===================================================== */

  constructor(private readonly fb: FormBuilder) {
    this.educationForm = this.fb.group({
      qualificationLevel: ['', Validators.required],
      degreeName: ['', [Validators.required, Validators.maxLength(100)]],
      institutionName: ['', [Validators.required, Validators.maxLength(120)]],
      universityBoard: ['', [Validators.required, Validators.maxLength(120)]],
      specialization: ['', [Validators.required, Validators.maxLength(100)]],
      percentageCgpa: ['', [Validators.required, Validators.maxLength(20)]],
      startYear: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
      endYear: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
    });
  }

  /* =====================================================
     SAVE
  ===================================================== */

  // saveEducation(): void {
  //   this.educationForm.markAllAsTouched();

  //   if (this.educationForm.invalid) {
  //     return;
  //   }

  //   console.log({
  //     ...this.educationForm.getRawValue(),
  //     documents: this.uploadedDocuments(),
  //   });

  //   this.isSaved.set(true);
  //   this.isEditMode.set(false);
  //   this.educationForm.disable();
  // }
  saveEducation(): void {
    this.educationForm.markAllAsTouched();

    if (this.educationForm.invalid) {
      return;
    }

    const payload: EmployeeEducationDto = {
      qualificationLevel: this.educationForm.value.qualificationLevel,
      degree: this.educationForm.value.degreeName,
      institutionName: this.educationForm.value.institutionName,
      universityOrBoard: this.educationForm.value.universityBoard,
      specialization: this.educationForm.value.specialization,
      percentageOrCGPA: Number(this.educationForm.value.percentageCgpa),
      startYear: Number(this.educationForm.value.startYear),
      endYear: Number(this.educationForm.value.endYear),
      fieldOfStudy: this.educationForm.value.specialization,
    };

    this.onboardingService.saveEducation(this.employeeId, payload).subscribe({
      next: () => {
        this.isSaved.set(true);
        this.isEditMode.set(false);
        this.educationForm.disable();

        console.log('Education saved successfully');
      },
      error: (error: unknown) => {
        console.error('Education save failed', error);
      },
    });
  }
  /* =====================================================
     RESET
  ===================================================== */

  resetForm(): void {
    this.educationForm.reset();
    this.uploadedDocuments.set([]);
    this.documentError.set('');
  }

  /* =====================================================
     EDIT
  ===================================================== */

  enableEdit(): void {
    this.isEditMode.set(true);
    this.educationForm.enable();
  }

  cancelEdit(): void {
    this.isEditMode.set(false);
    this.educationForm.disable();
  }

  /* =====================================================
     DROPDOWN
  ===================================================== */

  toggleQualificationDropdown(): void {
    this.qualificationDropdownOpen.update((v) => !v);
  }

  selectQualification(value: string, event: Event): void {
    event.stopPropagation();

    this.educationForm.patchValue({
      qualificationLevel: value,
    });

    this.educationForm.get('qualificationLevel')?.markAsTouched();

    this.qualificationDropdownOpen.set(false);
  }

  getQualificationLabel(value: string): string {
    const qualification = this.qualificationLevels.find((q) => q.value === value);

    return qualification ? qualification.label : 'Select Qualification Level';
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
    const control = this.educationForm.get(controlName);

    return !!(control && control.invalid && control.touched);
  }

  getError(controlName: string): string {
    const control = this.educationForm.get(controlName);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('maxlength')) {
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed`;
    }

    if (control.hasError('pattern')) {
      switch (controlName) {
        case 'startYear':
        case 'endYear':
          return 'Enter a valid 4-digit year';

        default:
          return 'Invalid format';
      }
    }

    return 'Invalid field';
  }
}
