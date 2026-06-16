import { Component, computed, inject, signal, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  faBuilding,
  faFileShield,
  faGear,
  faUser,
  faPen,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { faBell } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TabsComponent, Tab } from '../../../shared/components/tabs/tabs';

//import { CardComponent } from '../../../shared/components/card/card.component';

//import { ButtonComponent } from '../../../shared/components/button/button.component';

//import { InputComponent } from '../../../shared/components/input/input.component';

import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';

import { PageHeader } from '../../../shared/components/page-header/page-header.component';

import { PageSubHeader } from '../../../shared/components/page-sub-header/page-sub-header';

import { ThemeService } from '../../../core/theme/theme.service';
import { HRMS_THEMES } from '../../../core/theme/theme.config';
import { OrganizationManagementService } from '../../../core/services/organization-management.service';
import {
  OrganizationDTO,
  ThemeTypes,
  TenantStatus,
  OrganizationPolicyDTO,
} from '../../../core/api/tenant/models';
import { AuthService } from '../../../core/services/auth.service';
import { forkJoin } from 'rxjs';
import { PageLayout } from '../../../shared/components/page-layout/page-layout';
@Component({
  selector: 'app-organization',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabsComponent,
    Breadcrumbs,
    PageHeader,
    PageSubHeader,
    FontAwesomeModule,
    PageLayout
  ],

  templateUrl: './organization.html',

  styleUrl: './organization.scss',
})
export class OrganizationComponent implements OnInit {
  readonly organizationService = inject(OrganizationManagementService);
  readonly authService = inject(AuthService);

  readonly countries = signal<any[]>([]);
  readonly timezones = signal<any[]>([]);
  readonly organizationTypes = signal(['Private Limited', 'Startup', 'Agency']);

  /* =====================================================
     ICONS
  ===================================================== */

  readonly faGear = faGear;

  readonly faBell = faBell;

  readonly faUser = faUser;

  readonly faBuilding = faBuilding;

  readonly faFileShield = faFileShield;
  faPen = faPen;
  faXmark = faXmark;

  readonly isLoading = signal(true);

  /* =====================================================
     ACTIVE TAB
  ===================================================== */

  readonly activeTab = signal('details');
  readonly isSaved = signal(false);

  readonly isEditMode = signal(true);
  /* =====================================================
     TABS
  ===================================================== */

  readonly tabs: Tab[] = [
    {
      id: 'details',
      label: 'Organization Details',
      icon: faBuilding,
    },

    {
      id: 'policy',
      label: 'Organization Policy',
      icon: faFileShield,
    },
  ];

  /* =====================================================
     LOGO
  ===================================================== */

  // readonly logoPreview = signal('/logo.png');
  readonly logoPreview = signal<string | null>(null);
  /* =====================================================
     FORM
  ===================================================== */

  readonly orgForm: FormGroup;

  /* =====================================================
     FORM VALID
  ===================================================== */

  readonly isFormValid = computed(() => this.orgForm.valid);
  /* =====================================================
   THEME
===================================================== */
  readonly themeError = signal('');
  readonly selectedTheme = signal<keyof typeof HRMS_THEMES>('oceanBlue');
  // readonly selectedTheme = signal<keyof typeof HRMS_THEMES | null>(null);
  readonly logoError = signal('');

  readonly allowedLogoTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];

  readonly maxLogoSize = 2 * 1024 * 1024; // 2MB

  readonly countryDropdownOpen = signal(false);

  readonly organizationDropdownOpen = signal(false);
  readonly policyForm: FormGroup;
  readonly policyCountryDropdownOpen = signal(false);
  readonly timezoneDropdownOpen = signal(false);
  readonly nameFormatDropdownOpen = signal(false);
  readonly dateFormatDropdownOpen = signal(false);
  readonly timeFormatDropdownOpen = signal(false);

  nameFormats = [
    { label: 'First Last', value: 'FIRST_LAST' },
    { label: 'Last First', value: 'LAST_FIRST' },
    { label: 'First Middle Last', value: 'FIRST_MIDDLE_LAST' },
    { label: 'First Only', value: 'FIRST' },
    { label: 'Last Only', value: 'LAST' },
  ];

  dateFormats = [
    { label: 'dd/MM/yyyy', value: 'DD_MM_YYYY' },
    { label: 'MM/dd/yyyy', value: 'MM_DD_YYYY' },
    { label: 'yyyy/MM/dd', value: 'YYYY_MM_DD' },
    { label: 'dd-MMM-yyyy', value: 'DD_MMM_YYYY' },
    { label: 'dd-MMM-yy', value: 'DD_MMM_YY' },
    { label: 'MMM-dd-yyyy', value: 'MMM_DD_YYYY' },
  ];

  timeFormats = [
    { label: '12 Hour', value: 'TWELVE_HOUR' },
    { label: '24 Hour', value: 'TWENTY_FOUR_HOUR' },
  ];

  /* =====================================================
     CONSTRUCTOR
  ===================================================== */

  constructor(
    private readonly fb: FormBuilder,

    private themeService: ThemeService,
  ) {
    this.orgForm = this.fb.group({
      /* =====================================================
     ORGANIZATION NAME
  ===================================================== */
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],

      /* =====================================================
     WEBSITE
  ===================================================== */
      website: ['', [Validators.pattern(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/)]],

      /* =====================================================
     ORGANIZATION TYPE
  ===================================================== */
      organizationType: ['', Validators.required],

      /* =====================================================
     CONTACT PERSON
  ===================================================== */
      contactPerson: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

      /* =====================================================
     PHONE
  ===================================================== */
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{8,20}$/)]],

      /* =====================================================
     EMAIL
  ===================================================== */
      email: ['', [Validators.required, Validators.email]],

      /* =====================================================
     CITY
  ===================================================== */
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],

      /* =====================================================
     STATE
  ===================================================== */
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],

      /* =====================================================
     COUNTRY
  ===================================================== */
      country: ['', Validators.required],

      /* =====================================================
     ZIP CODE
  ===================================================== */
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,10}$/)]],

      /* =====================================================
     ADDRESS
  ===================================================== */
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    });

    this.policyForm = this.fb.group({
      notifications: [true],
      chat: [true],
      aiAssistant: [false],

      birthdayVisibility: [true],
      workAnniversaryVisibility: [true],
      mobileNumberVisibility: [true],
      mobileSearchAccess: [true],

      profileUpdatePermission: ['Employee', Validators.required],

      systemCoverImages: [false],
      customCoverUpload: [false],

      recycleRetention: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(120),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      profilePictureApproval: [false],

      localeCountry: ['', Validators.required],
      timezone: ['', Validators.required],
      nameFormat: ['FIRST_LAST', Validators.required],
      dateFormat: ['DD_MMM_YYYY', Validators.required],
      timeFormat: ['TWELVE_HOUR', Validators.required],
    });
  }

  ngOnInit() {
    this.loadOrganization();
    this.loadCountries();
    this.loadTimezones();
    this.loadPolicy();
  }

  loadOrganization() {
    this.isLoading.set(true);

    this.organizationService.loadOrganization().subscribe({
      next: (response) => {
        this.orgForm.patchValue({
          name: response.name,

          website: response.website,

          organizationType: response.organizationType,

          contactPerson: response.contactPerson,

          phone: response.contactNumber,

          email: response.contactEmail,

          city: response.city,

          state: response.state,

          country: response.country,

          zipCode: response.zipCode,

          address: response.address,
        });

        this.logoPreview.set(response.logo ?? null);

        // Check whether organization setup already exists
        const hasOrganizationSetup = !!response.logo;

        this.isSaved.set(hasOrganizationSetup);

        if (hasOrganizationSetup) {
          // Existing organization → show Edit
          this.isEditMode.set(false);
          this.orgForm.disable();
        } else {
          // First login → show Save
          this.isEditMode.set(true);
          this.orgForm.enable();
        }

        if (response.theme) {
          let theme: keyof typeof HRMS_THEMES = 'oceanBlue';

          switch (response.theme) {
            case ThemeTypes.OceanBlue:
              theme = 'oceanBlue';
              break;

            case ThemeTypes.Emerald:
              theme = 'emerald';
              break;

            case ThemeTypes.SunsetOrange:
              theme = 'sunsetOrange';
              break;

            case ThemeTypes.RoyalPurple:
              theme = 'royalPurple';
              break;

            case ThemeTypes.RosePink:
              theme = 'rosePink';
              break;

            case ThemeTypes.MidnightDark:
              theme = 'midnightDark';
              break;
          }

          this.selectedTheme.set(theme);

          // Apply theme on login/page load
          this.themeService.applyTheme(theme);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  loadPolicy() {
    this.organizationService.loadPolicy().subscribe({
      next: (response: any) => {
        const policy = response.data;

        this.policyForm.patchValue({
          notifications: policy.notifications,
          chat: policy.chat,
          aiAssistant: policy.aiAssistant,

          birthdayVisibility: policy.birthdayVisibility,
          workAnniversaryVisibility: policy.workAnniversaryVisibility,
          mobileNumberVisibility: policy.mobileNumberVisibility,

          mobileSearchAccess: policy.mobileSearchAccess,

          profileUpdatePermission: policy.updatePermission,

          systemCoverImages: policy.systemCoverImage,

          customCoverUpload: policy.customCoverUpload,

          recycleRetention: policy.recordRetentionMonths,

          profilePictureApproval: policy.profileUpdateApproval,

          localeCountry: policy.countryId,

          timezone: policy.timeZoneId,

          nameFormat: policy.nameFormat,

          dateFormat: policy.dateFormat,

          timeFormat: policy.timeFormat,
        });

        console.log(policy);
        console.log(this.policyForm.getRawValue());
      },
    });
  }
  savePolicy() {
    this.policyForm.markAllAsTouched();

    if (this.policyForm.invalid) {
      return;
    }
    const form = this.policyForm.getRawValue();

    const payload: OrganizationPolicyDTO = {
      notifications: form.notifications,
      chat: form.chat,
      aiAssistant: form.aiAssistant,

      birthdayVisibility: form.birthdayVisibility,
      workAnniversaryVisibility: form.workAnniversaryVisibility,
      mobileNumberVisibility: form.mobileNumberVisibility,

      mobileSearchAccess: form.mobileSearchAccess,

      updatePermission: form.profileUpdatePermission,

      systemCoverImage: form.systemCoverImages,
      customCoverUpload: form.customCoverUpload,

      recordRetentionMonths: form.recycleRetention,

      profileUpdateApproval: form.profilePictureApproval,

      countryId: form.localeCountry,

      timeZoneId: form.timezone,

      nameFormat: form.nameFormat,

      dateFormat: form.dateFormat,

      timeFormat: form.timeFormat,
    };

    this.organizationService.savePolicy(payload).subscribe({
      next: () => {
        console.log('Policy saved');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //load country
  loadCountries() {
    this.organizationService.loadCountries().subscribe({
      next: (response) => {
        this.countries.set(response);
      },
    });
  }
  //load time zone
  loadTimezones() {
    this.organizationService.loadTimezones().subscribe({
      next: (response) => {
        this.timezones.set(response);
      },
    });
  }

  readonly profilePermissionDropdownOpen = signal(false);

  toggleProfilePermissionDropdown(): void {
    this.profilePermissionDropdownOpen.update((v) => !v);
  }

  selectProfilePermission(value: string, event: Event): void {
    event.stopPropagation();

    this.policyForm.patchValue({
      profileUpdatePermission: value,
    });

    this.profilePermissionDropdownOpen.set(false);
  }
  //map country name
  getCountryName(countryId: string): string {
    const country = this.countries().find((c) => c.id === countryId);

    return country?.name ?? '';
  }

  togglePolicyCountryDropdown() {
    this.policyCountryDropdownOpen.update((v) => !v);
  }

  selectPolicyCountry(value: string, event: Event) {
    event.stopPropagation();

    this.policyForm.patchValue({
      localeCountry: value,
    });

    this.policyCountryDropdownOpen.set(false);
  }

  getTimezoneName(id: string): string {
    const timezone = this.timezones().find((t) => t.id === id);

    return timezone?.displayName ?? '';
  }
  toggleTimezoneDropdown(): void {
    this.timezoneDropdownOpen.update((v) => !v);
  }
  selectTimezone(value: string, event: Event): void {
    event.stopPropagation();

    this.policyForm.patchValue({
      timezone: value,
    });

    this.timezoneDropdownOpen.set(false);
  }

  toggleDateFormatDropdown(): void {
    this.dateFormatDropdownOpen.update((v) => !v);
  }

  toggleTimeFormatDropdown(): void {
    this.timeFormatDropdownOpen.update((v) => !v);
  }
  selectDateFormat(value: string, event: Event): void {
    event.stopPropagation();

    this.policyForm.patchValue({
      dateFormat: value,
    });

    this.dateFormatDropdownOpen.set(false);
  }

  selectTimeFormat(value: string, event: Event): void {
    event.stopPropagation();

    this.policyForm.patchValue({
      timeFormat: value,
    });

    this.timeFormatDropdownOpen.set(false);
  }

  getDateFormatLabel(value: string): string {
    return this.dateFormats.find((f) => f.value === value)?.label ?? '';
  }

  getTimeFormatLabel(value: string): string {
    return this.timeFormats.find((f) => f.value === value)?.label ?? '';
  }
  selectNameFormat(value: string, event: Event): void {
    event.stopPropagation();

    this.policyForm.patchValue({
      nameFormat: value,
    });

    this.nameFormatDropdownOpen.set(false);
  }

  toggleNameFormatDropdown(): void {
    this.nameFormatDropdownOpen.update((v) => !v);
  }

  getNameFormatLabel(value: string): string {
    return this.nameFormats.find((f) => f.value === value)?.label ?? '';
  }
  //map theme
  private mapTheme(): ThemeTypes {
    switch (this.selectedTheme()) {
      case 'oceanBlue':
        return ThemeTypes.OceanBlue;

      case 'emerald':
        return ThemeTypes.Emerald;

      case 'sunsetOrange':
        return ThemeTypes.SunsetOrange;

      case 'royalPurple':
        return ThemeTypes.RoyalPurple;

      case 'rosePink':
        return ThemeTypes.RosePink;

      case 'midnightDark':
        return ThemeTypes.MidnightDark;

      default:
        return ThemeTypes.OceanBlue;
    }
  }

  /* =====================================================
     LOGO CHANGE
  ===================================================== */

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (!file) return;

    this.logoError.set('');

    /* =====================================================
     FILE TYPE VALIDATION
  ===================================================== */

    if (!this.allowedLogoTypes.includes(file.type)) {
      this.logoError.set('Only PNG, JPG and SVG files are allowed');

      input.value = '';

      return;
    }

    /* =====================================================
     FILE SIZE VALIDATION
  ===================================================== */

    if (file.size > this.maxLogoSize) {
      this.logoError.set('Logo size must be less than 2MB');

      input.value = '';

      return;
    }

    /* =====================================================
     PREVIEW
  ===================================================== */

    const reader = new FileReader();

    reader.onload = () => {
      this.logoPreview.set(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  saveOrg(): void {
    this.orgForm.markAllAsTouched();

    if (this.orgForm.invalid) {
      return;
    }

    const payload: OrganizationDTO = {
      // id: '',

      name: this.orgForm.value.name,

      subdomain: this.authService.tenant()?.subdomain ?? '',

      website: this.orgForm.value.website ?? '',

      organizationType: this.orgForm.value.organizationType ?? '',

      contactPerson: this.orgForm.value.contactPerson ?? '',

      contactNumber: this.orgForm.value.phone ?? '',

      contactEmail: this.orgForm.value.email ?? '',

      address: this.orgForm.value.address ?? '',

      city: this.orgForm.value.city ?? '',

      state: this.orgForm.value.state ?? '',

      country: this.orgForm.value.country ?? '',

      zipCode: this.orgForm.value.zipCode ?? '',

      logo: this.logoPreview(),

      theme: this.mapTheme(),

      status: TenantStatus.Active,
    };

    this.organizationService.saveOrganization(payload).subscribe({
      next: () => {
        this.isSaved.set(true);

        this.isEditMode.set(false);

        this.orgForm.disable();
      },

      error: (err) => {
        console.log('Save failed', err);
      },
    });
  }

  /* =====================================================
     RESET
  ===================================================== */

  resetForm(): void {
    this.orgForm.reset();
    this.logoPreview.set(null);

    this.logoError.set('');
  }

  // EDIT AND CANCEL
  enableEdit(): void {
    this.isEditMode.set(true);

    this.orgForm.enable();
  }

  cancelEdit(): void {
    this.loadOrganization();

    this.isEditMode.set(false);
    this.orgForm.disable();
  }

  /* =====================================================
    THEME
  ===================================================== */

  selectTheme(theme: keyof typeof HRMS_THEMES): void {
    this.selectedTheme.set(theme);

    this.themeError.set('');

    this.themeService.applyTheme(theme);
  }
  /* =====================================================
     INVALID FIELD
  ===================================================== */

  isInvalid(controlName: string): boolean {
    const control = this.orgForm.get(controlName);

    return !!(control && control.invalid && control.touched);
  }

  toggleCountryDropdown(): void {
    this.countryDropdownOpen.update((v) => !v);

    this.organizationDropdownOpen.set(false);
  }

  selectCountry(value: string, event: Event): void {
    event.stopPropagation();

    this.orgForm.patchValue({
      country: value,
    });

    this.orgForm.get('country')?.markAsTouched();

    this.countryDropdownOpen.set(false);
  }

  toggleOrganizationDropdown(): void {
    this.organizationDropdownOpen.update((v) => !v);

    this.countryDropdownOpen.set(false);
  }

  selectOrganizationType(value: string, event: Event): void {
    event.stopPropagation();

    this.orgForm.patchValue({
      organizationType: value,
    });

    this.orgForm.get('organizationType')?.markAsTouched();

    this.organizationDropdownOpen.set(false);
  }

  /* =====================================================
     ERRORS
  ===================================================== */

  getError(controlName: string): string {
    const control = this.orgForm.get(controlName);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('email')) {
      return 'Enter valid email address';
    }

    if (control.hasError('minlength')) {
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    }

    if (control.hasError('maxlength')) {
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed`;
    }

    if (control.hasError('pattern')) {
      switch (controlName) {
        case 'phone':
          return 'Enter valid contact number';

        case 'website':
          return 'Enter valid website URL';

        case 'zipCode':
          return 'Enter valid zip code';

        default:
          return 'Invalid format';
      }
    }

    return 'Invalid field';
  }

  getFormattedTheme(): string {
    const theme = this.selectedTheme();

    return theme.replace(/([A-Z])/g, ' $1').replace(/^./, function (c) {
      return c.toUpperCase();
    });
  }

  getRecycleRetentionError(): string {
    const control = this.policyForm.get('recycleRetention');

    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'Retention period is required';
    }

    if (control.errors['min']) {
      return 'Minimum retention is 1 month';
    }

    if (control.errors['max']) {
      return 'Maximum retention is 120 months';
    }

    if (control.errors['pattern']) {
      return 'Only numbers are allowed';
    }

    return '';
  }
  isPolicyFieldInvalid(field: string): boolean {
    const control = this.policyForm.get(field);

    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getPolicyFieldError(field: string): string {
    const control = this.policyForm.get(field);

    if (!control?.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'This field is required';
    }

    if (control.errors['min']) {
      return 'Minimum value is 1';
    }

    if (control.errors['max']) {
      return 'Maximum value is 120';
    }

    if (control.errors['pattern']) {
      return 'Only numbers allowed';
    }

    return 'Invalid value';
  }
}
