import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTableCells, faList, faBolt } from '@fortawesome/free-solid-svg-icons';
import { StatsCards } from '../../shared/components/stats-cards/stats-cards';
import { Breadcrumbs } from '../../shared/components/breadcrumbs/breadcrumbs';
import { PageHeader } from '../../shared/components/page-header/page-header.component';
import {
  faSearch,
  faBoxArchive,
  faCheckCircle,
  faUserCheck,
  faScrewdriverWrench,
  faIndianRupeeSign,
  faPlus,
  faFileExport,
  faLaptop,
  faMobileScreen,
  faDisplay,
} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import {
  faTriangleExclamation,
  faClock,
  faDollarSign,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PageSubHeader } from '../../shared/components/page-sub-header/page-sub-header';
import { ManagementTable } from '../../shared/components/management-table/management-table';
import { QuickActions } from '../../shared/components/quick-actions/quick-actions';
import { PageLayout } from '../../shared/components/page-layout/page-layout';
@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    Breadcrumbs,
    PageHeader,
    ModalComponent,
    ReactiveFormsModule,
    PageSubHeader,
    StatsCards,
    ManagementTable,
    QuickActions,
    PageLayout
  ],
  templateUrl: './assets.html',
  styleUrl: './assets.scss',
})
export class Assets {
  readonly faSearch = faSearch;
  readonly faBoxArchive = faBoxArchive;
  readonly faPlus = faPlus;
  readonly faFileExport = faFileExport;
  readonly faTableCells = faTableCells;
  readonly faList = faList;
  readonly faTriangleExclamation = faTriangleExclamation;
  readonly faClock = faClock;
  readonly faDollarSign = faDollarSign;
  readonly faDesktop = faDesktop;
   faBolt=faBolt;
  readonly viewMode = signal<'grid' | 'list'>('grid');
  readonly faLaptop = faLaptop;
  readonly faMobileScreen = faMobileScreen;
  readonly isAddAssetModalOpen = signal(false);
  readonly quickActions = signal([
    {
      label: 'Expiring Warranty',
      icon: this.faTriangleExclamation,
      action: 'expiring',
    },
    {
      label: 'Recently Added',
      icon: this.faClock,
      action: 'recent',
    },
    {
      label: 'High Value',
      icon: this.faDollarSign,
      action: 'high-value',
    },
    {
      label: 'Unassigned',
      icon: this.faDesktop,
      action: 'unassigned',
    },
  ]);
  handleQuickAction(action: string): void {
    switch (action) {
      case 'expiring':
        console.log('Expiring Warranty');
        break;

      case 'recent':
        console.log('Recently Added');
        break;

      case 'high-value':
        console.log('High Value Assets');
        break;

      case 'unassigned':
        console.log('Unassigned Assets');
        break;
    }
  }
  constructor(private router: Router) {}
  viewAsset(asset: any): void {
    this.router.navigate(['/assets', asset.code]);
  }
  submitAsset(): void {
    console.log('oo');
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }

    const form = this.assetForm.getRawValue();

    let icon = faLaptop;

    switch (form.category) {
      case 'Mobile':
        icon = faMobileScreen;
        break;
      case 'Monitor':
        icon = faDisplay;
        break;
      default:
        icon = faLaptop;
    }

    const newAsset = {
      name: form.assetName ?? '',
      code: form.assetTag || `AST-${Date.now()}`,
      icon,
      model: `${form.brand || ''} ${form.model || ''}`,
      location: form.location || '',
      warranty: form.warrantyEndDate || '',
      warrantyStatus: 'Active',
      value: form.purchaseCost ? `₹${Number(form.purchaseCost).toLocaleString()}` : '₹0',
      employee: 'Unassigned',
      employeeInitials: 'UA',
      status: form.initialStatus || 'Available',
    };

    this.assets.update((assets) => [newAsset, ...assets]);

    this.assetForm.reset({
      maintenanceContract: 'None',
      department: 'General Pool',
      initialStatus: 'Available',
    });

    this.closeAddAssetModal();
  }
  openAddAssetModal(): void {
    this.isAddAssetModalOpen.set(true);
  }

  closeAddAssetModal(): void {
    this.isAddAssetModalOpen.set(false);
  }
  private fb = inject(FormBuilder);

  readonly assetForm = this.fb.group({
    assetTag: [''],
    category: ['', Validators.required],
    assetName: ['', Validators.required],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    serialNumber: ['', Validators.required],
    modelNumber: [''],

    purchaseDate: [''],
    purchaseCost: [''],
    vendor: [''],
    invoiceNumber: [''],

    warrantyPeriod: [''],
    warrantyEndDate: [''],
    maintenanceContract: ['None'],
    nextMaintenanceDate: [''],

    location: ['', Validators.required],
    floorBuilding: [''],
    department: ['General Pool'],
    initialStatus: ['Available'],

    specifications: [''],
    notes: [''],
  });
  setView(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }
  readonly statsCards = computed(() => [
    {
      title: 'Total Assets',
      value: '8',
      subtitle: 'Across organization',
      icon: faBoxArchive,
      color: 'blue',
    },
    {
      title: 'Available',
      value: '3',
      subtitle: 'Ready to assign',
      icon: faCheckCircle,
      color: 'green',
    },
    {
      title: 'Assigned',
      value: '4',
      subtitle: 'Currently assigned',
      icon: faUserCheck,
      color: 'purple',
    },
    {
      title: 'Maintenance',
      value: '1',
      subtitle: 'Under service',
      icon: faScrewdriverWrench,
      color: 'orange',
    },
    // {
    //   title: 'Total Value',
    //   value: '$760,500',
    //   subtitle: 'Asset valuation',
    //   icon: faIndianRupeeSign,
    //   color: 'blue',
    // },
  ]);

  readonly assets = signal([
    {
      name: 'MacBook Pro 14" M3',
      code: 'AST-1045',
      icon: faLaptop,

      model: 'Apple MacBook Pro 14"',
      location: 'Bangalore',

      warranty: 'Mar 14, 2028',
      warrantyStatus: 'Active',

      value: '$195,000',

      employee: 'Nisha Sharma',
      employeeInitials: 'NS',

      status: 'Assigned',
    },

    {
      name: 'Dell UltraSharp U2723QE',
      code: 'AST-1056',
      icon: faDisplay,

      model: 'Dell U2723QE',
      location: 'Bangalore',

      warranty: 'Aug 20, 2027',
      warrantyStatus: 'Active',

      value: '$65,000',

      employee: 'Nisha Sharma',
      employeeInitials: 'NS',

      status: 'Assigned',
    },

    {
      name: 'iPhone 15 Pro',
      code: 'AST-1067',
      icon: faMobileScreen,

      model: 'Apple iPhone 15 Pro',
      location: 'Bangalore',

      warranty: 'Jun 1, 2026',
      warrantyStatus: 'Expiring',

      value: '$120,000',

      employee: 'Priya Patel',
      employeeInitials: 'PP',

      status: 'Assigned',
    },

    {
      name: 'Magic Keyboard',
      code: 'AST-1078',
      icon: faLaptop,

      model: 'Apple Magic Keyboard',
      location: 'Bangalore',

      warranty: 'Dec 31, 2026',
      warrantyStatus: 'Active',

      value: '$15,000',

      employee: 'Unassigned',
      employeeInitials: 'UA',

      status: 'Available',
    },

    {
      name: 'Dell Latitude 7440',
      code: 'AST-1023',
      icon: faLaptop,

      model: 'Dell Latitude 7440',
      location: 'Bangalore',

      warranty: 'Jun 12, 2026',
      warrantyStatus: 'Expiring',

      value: '$96,500',

      employee: 'Unassigned',
      employeeInitials: 'UA',

      status: 'Available',
    },

    {
      name: 'HP EliteBook 840',
      code: 'AST-1034',
      icon: faLaptop,

      model: 'HP EliteBook 840',
      location: 'IT Support Bay',

      warranty: 'Jun 15, 2026',
      warrantyStatus: 'Expiring',

      value: '$89,000',

      employee: 'Maintenance',
      employeeInitials: 'MT',

      status: 'Maintenance',
    },

    {
      name: 'Lenovo ThinkPad T14',
      code: 'AST-1091',
      icon: faLaptop,

      model: 'Lenovo ThinkPad T14',
      location: 'Mumbai',

      warranty: 'Jan 10, 2028',
      warrantyStatus: 'Active',

      value: '$110,000',

      employee: 'Rahul Verma',
      employeeInitials: 'RV',

      status: 'Assigned',
    },

    {
      name: 'Samsung Galaxy S24',
      code: 'AST-1102',
      icon: faMobileScreen,

      model: 'Samsung Galaxy S24',
      location: 'Chennai',

      warranty: 'Feb 28, 2027',
      warrantyStatus: 'Active',

      value: '$82,000',

      employee: 'Aisha Khan',
      employeeInitials: 'AK',

      status: 'Assigned',
    },
  ]);
}
