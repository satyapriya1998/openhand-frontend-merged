// profile.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Breadcrumbs } from '../../shared/components/breadcrumbs/breadcrumbs';
import { PageHeader } from '../../shared/components/page-header/page-header.component';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';

import { faUser, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//import { CardComponent } from '../../shared/components/card/card.component';

type SectionKey = 'employee' | 'banking' | 'documents' | 'emergency';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Breadcrumbs,
    PageHeader,
    SkeletonLoaderComponent,
    SectionCardComponent,
    FontAwesomeModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);

  private maxShadowMove = 6;
private blur = 14;

onMouseMove(event: MouseEvent, element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // normalize between -1 and 1
  const percentX = (mouseX / rect.width - 0.5) * 2;
  const percentY = (mouseY / rect.height - 0.5) * 2;

  // limit movement so large divs don't create huge shadows
  const shadowX = percentX * this.maxShadowMove;
  const shadowY = percentY * this.maxShadowMove;

  element.style.boxShadow = `
    ${shadowX}px ${shadowY}px ${this.blur}px rgba(0, 0, 0, 0.10)
  `;
}

onMouseLeave(element: HTMLElement) {
  element.style.boxShadow =
    `0 4px ${this.blur}px rgba(0, 0, 0, 0.2)`;
}
 
  faUser = faUser
 faDownload = faDownload;

  loading = signal(false);
  editingHeader = signal(false);
  activeBottomTab = signal('details');

  bottomTabs = [
    { id: 'details', label: 'Details' },
    { id: 'banking', label: 'Banking' },
    { id: 'documents', label: 'Documents' },
    { id: 'emergency', label: 'Emergency' }
    
  ];

  employmentOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Intern'
  ];

  editing = signal<Record<SectionKey, boolean>>({
    employee: false,
    banking: false,
    documents: false,
    emergency: false
  });

  profile = signal<any>(null);

  headerForm!: FormGroup;

  forms!: Record<
    Exclude<SectionKey, 'documents'>,
    FormGroup
  >;

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const data = {
      id: 'EMP001',
      name: 'Priya Sharma',
      designation: 'Head of People Ops',
      department: 'People Ops',
      email: 'priya.sharma@company.com',
      phone: '+91 98765 11111',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',

      employeeInformation: {
        employeeId: 'EMP001',
        joiningDate: '2021-03-14',
        reportingManager: 'Arjun Mehta',
        workLocation: 'Bangalore HQ',
        employmentType: 'Full-time'
      },

      bankingInformation: {
        bankName: 'HDFC Bank',
        accountNumber: 'XXXXXXX4521',
        ifscCode: 'HDFC0001234',
        panNumber: 'ABCDE1234F'
      },

      documents: [
        {
          id: 1,
          name: 'Aadhaar Card',
          uploadDate: '2025-10-12'
        },
        {
          id: 2,
          name: 'PAN Card',
          uploadDate: '2025-11-08'
        }
      ],

      emergencyContacts: {
        primary: {
          name: 'Raj Sharma',
          phone: '+91 9988776655'
        },
        secondary: {
          name: 'Anita Sharma',
          phone: '+91 8877665544'
        }
      }
    };

    this.profile.set(data);
    this.buildForms();
  }

  buildForms(): void {
    const profile = this.profile();

    if (!profile) {
      return;
    }

    this.headerForm = this.fb.group({
      name: [profile.name, Validators.required],
      designation: [profile.designation, Validators.required],
      department: [profile.department, Validators.required]
    });

    this.forms = {
      employee: this.fb.group({
        employeeId: [
          profile.employeeInformation.employeeId,
          Validators.required
        ],
        joiningDate: [
          profile.employeeInformation.joiningDate,
          Validators.required
        ],
        reportingManager: [
          profile.employeeInformation.reportingManager,
          Validators.required
        ],
        workLocation: [
          profile.employeeInformation.workLocation,
          Validators.required
        ],
        employmentType: [
          profile.employeeInformation.employmentType,
          Validators.required
        ]
      }),

      banking: this.fb.group({
        bankName: [
          profile.bankingInformation?.bankName || ''
        ],
        accountNumber: [
          profile.bankingInformation?.accountNumber || ''
        ],
        ifscCode: [
          profile.bankingInformation?.ifscCode || ''
        ],
        panNumber: [
          profile.bankingInformation?.panNumber || ''
        ]
      }),

      emergency: this.fb.group({
        primaryName: [
          profile.emergencyContacts?.primary?.name || ''
        ],
        primaryPhone: [
          profile.emergencyContacts?.primary?.phone || ''
        ],
        secondaryName: [
          profile.emergencyContacts?.secondary?.name || ''
        ],
        secondaryPhone: [
          profile.emergencyContacts?.secondary?.phone || ''
        ]
      })
    };
  }

  saveHeader(): void {
    if (this.headerForm.invalid) {
      this.headerForm.markAllAsTouched();
      return;
    }

    this.profile.update((prev: any) => ({
      ...prev,
      ...this.headerForm.value
    }));

    this.editingHeader.set(false);
  }

  cancelHeader(): void {
    this.editingHeader.set(false);
    this.buildForms();
  }

onSave(section: SectionKey): void {

  if (section === 'documents') {
    this.editing.update((prev) => ({
      ...prev,
      documents: false
    }));

    return;
  }

  const form = this.forms[section];

  if (form.invalid) {
    form.markAllAsTouched();
    return;
  }

  const current = this.profile();

  switch (section) {

    case 'employee':
      current.employeeInformation = {
        ...current.employeeInformation,
        ...form.value
      };
      break;

    case 'banking':
      current.bankingInformation = {
        ...current.bankingInformation,
        ...form.value
      };
      break;

    case 'emergency':
      current.emergencyContacts = {
        primary: {
          name: form.value.primaryName,
          phone: form.value.primaryPhone
        },
        secondary: {
          name: form.value.secondaryName,
          phone: form.value.secondaryPhone
        }
      };
      break;
  }

  this.profile.set({ ...current });

  this.editing.update((prev) => ({
    ...prev,
    [section]: false
  }));
}

  onCancel(section: SectionKey): void {
    this.editing.update((prev) => ({
      ...prev,
      [section]: false
    }));

    this.buildForms();
  }

  onAvatarChange(): void {
    console.log('Avatar change clicked');
  }
}