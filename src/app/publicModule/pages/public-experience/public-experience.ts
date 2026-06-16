// public-experience.ts

import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { inject } from '@angular/core';
import { EmployeeExperienceDto, EmploymentType } from '../../../core/api/organization';

import { OnboardingManagementService } from '../../../core/services/onboarding-management.service';
import {
  faBriefcase,
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
  selector: 'app-public-experience',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PageSubHeader,
    Breadcrumbs,
    PageHeader,
  ],
  templateUrl: './public-experience.html',
  styleUrls: ['../../public.style.scss'],
})
export class PublicExperience {
  /* =====================================================
     ICONS
  ===================================================== */
  private readonly onboardingService = inject(OnboardingManagementService);

  employeeId = '9e7d29d9-6381-48d1-8c04-ea1346213e17';
  readonly faBriefcase = faBriefcase;
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

  readonly employmentDropdownOpen = signal(false);

  readonly uploadedDocuments = signal<
    {
      name: string;
      size: string;
      type: string;
      url: string;
      category: string;
    }[]
  >([]);

  readonly documentError = signal('');

  readonly allowedDocumentTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];

  readonly maxDocumentSize = 5 * 1024 * 1024;

  readonly employmentTypes = [
    { value: 'fulltime', label: 'Full Time' },
    { value: 'parttime', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'freelance', label: 'Freelance' },
  ];

  readonly documentCategories = ['Experience Letter', 'Relieving Letter', 'Salary Slip'];

  /* =====================================================
     FORM
  ===================================================== */

  readonly experienceForm: FormGroup;

  readonly isFormValid = computed(() => this.experienceForm.valid);

  /* =====================================================
     CONSTRUCTOR
  ===================================================== */

  constructor(private readonly fb: FormBuilder) {
    this.experienceForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.maxLength(120)]],

      designation: ['', [Validators.required, Validators.maxLength(100)]],

      employmentType: ['', Validators.required],

      startDate: ['', Validators.required],

      endDate: ['', Validators.required],

      technologies: ['', [Validators.required, Validators.maxLength(300)]],

      currentCtc: ['', [Validators.required, Validators.maxLength(20)]],

      lastDrawnSalary: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  /* =====================================================
     SAVE
  ===================================================== */

  // saveExperience(): void {
  //   this.experienceForm.markAllAsTouched();

  //   if (this.experienceForm.invalid) {
  //     return;
  //   }

  //   console.log({
  //     ...this.experienceForm.getRawValue(),
  //     documents: this.uploadedDocuments(),
  //   });

  //   this.isSaved.set(true);
  //   this.isEditMode.set(false);

  //   this.experienceForm.disable();
  // }
  saveExperience(): void {
    this.experienceForm.markAllAsTouched();

    if (this.experienceForm.invalid) {
      return;
    }

    const payload: EmployeeExperienceDto = {
      companyName: this.experienceForm.value.companyName,
      designation: this.experienceForm.value.designation,

      startDate: new Date(this.experienceForm.value.startDate),
      endDate: new Date(this.experienceForm.value.endDate),

      employmentType: this.mapEmploymentType(),

      technologiesUsed: this.experienceForm.value.technologies
        .split(',')
        .map((x: string) => x.trim())
        .filter((x: string) => x),

      currentCTC: Number(this.experienceForm.value.currentCtc),

      lastDrawnSalary: Number(this.experienceForm.value.lastDrawnSalary),

      responsibilities: '',
    };

    this.onboardingService.saveExperience(this.employeeId, payload).subscribe({
      next: () => {
        this.isSaved.set(true);
        this.isEditMode.set(false);
        this.experienceForm.disable();

        console.log('Experience saved successfully');
      },
      error: (error: unknown) => {
        console.error('Experience save failed', error);
      },
    });
  }

  private mapEmploymentType(): EmploymentType {
    switch (this.experienceForm.value.employmentType) {
      case 'fulltime':
        return EmploymentType._1; // Permanent

      case 'contract':
        return EmploymentType._2; // Contract

      case 'internship':
        return EmploymentType._3; // Internship

      case 'freelance':
        return EmploymentType._4; // Freelancer

      case 'parttime':
        return EmploymentType._6; // PartTime

      default:
        return EmploymentType._1;
    }
  }
  /* =====================================================
     RESET
  ===================================================== */

  resetForm(): void {
    this.experienceForm.reset();

    this.uploadedDocuments.set([]);

    this.documentError.set('');
  }

  /* =====================================================
     EDIT
  ===================================================== */

  enableEdit(): void {
    this.isEditMode.set(true);

    this.experienceForm.enable();
  }

  cancelEdit(): void {
    this.isEditMode.set(false);

    this.experienceForm.disable();
  }

  /* =====================================================
     DROPDOWN
  ===================================================== */

  toggleEmploymentDropdown(): void {
    this.employmentDropdownOpen.update((v) => !v);
  }

  selectEmployment(value: string, event: Event): void {
    event.stopPropagation();

    this.experienceForm.patchValue({
      employmentType: value,
    });

    this.experienceForm.get('employmentType')?.markAsTouched();

    this.employmentDropdownOpen.set(false);
  }

  getEmploymentLabel(value: string): string {
    const employment = this.employmentTypes.find((e) => e.value === value);

    return employment ? employment.label : 'Select Employment Type';
  }

  /* =====================================================
     DOCUMENTS
  ===================================================== */

  onDocumentUpload(event: Event, category: string): void {
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
        category,
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
    const control = this.experienceForm.get(controlName);

    return !!(control && control.invalid && control.touched);
  }

  getError(controlName: string): string {
    const control = this.experienceForm.get(controlName);

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