import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
import { computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentManagementService } from '../../../core/services/department-management.service';
import { faBolt, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { inject } from '@angular/core';
import { DesignationManagementService } from '../../../core/services/designation-management.service';
import { StatsCards } from '../../../shared/components/stats-cards/stats-cards';
import { PageLayout } from '../../../shared/components/page-layout/page-layout';
import {
  faFilter,
  faPlus,
  faSearch,
  faSliders,
  faEllipsis,
  faUserTie,
  faLayerGroup,
  faUsers,
  faSitemap,
  faUserPlus,
  faFileExport,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import { ChangeDetectorRef } from '@angular/core';
import { LevelManagementService } from '../../../core/services/level-management.service';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { PageHeader } from '../../../shared/components/page-header/page-header.component';
import { ManagementTable } from '../../../shared/components/management-table/management-table';
import { QuickActions } from '../../../shared/components/quick-actions/quick-actions';
import { PageSubHeader } from '../../../shared/components/page-sub-header/page-sub-header';
@Component({
  selector: 'app-designations',

  standalone: true,

  imports: [
    CommonModule,
    FontAwesomeModule,
    Breadcrumbs,
    PageHeader,
    FormsModule,
    ModalComponent,
    StatsCards,
    ManagementTable,
    QuickActions,
    PageLayout,
    PageSubHeader
  ],

  templateUrl: './designations.html',

  styleUrl: './designations.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignationsComponent implements OnInit {
  readonly faFilter = faFilter;
 faBolt=faBolt;
  readonly faPlus = faPlus;

  readonly faSearch = faSearch;

  readonly faSliders = faSliders;

  readonly faEllipsis = faEllipsis;

  readonly faUserTie = faUserTie;

  readonly faLayerGroup = faLayerGroup;

  readonly faUsers = faUsers;

  readonly faSitemap = faSitemap;
  private readonly departmentManagementService = inject(DepartmentManagementService);
  readonly faPenToSquare = faPenToSquare;
  readonly faTrashCan = faTrashCan;
  readonly faUserPlus = faUserPlus;
  readonly isEditDesignationModalOpen = signal(false);
  readonly isDeleteDesignationModalOpen = signal(false);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly departmentDropdownOpen = signal(false);
  readonly statusDropdownOpen = signal(false);
  private readonly levelManagementService = inject(LevelManagementService);
  readonly searchTerm = signal('');
  levels = signal<any[]>([]);
  readonly levelDropdownOpen = signal(false);
  readonly filteredDesignations = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) {
      return this.designations();
    }

    return this.designations().filter(
      (item) =>
        item.title?.toLowerCase().includes(term) ||
        item.department?.toLowerCase().includes(term) ||
        item.status?.toLowerCase().includes(term),
    );
  });
  selectedDesignation: any = null;
  departments = signal<any[]>([]);

  toggleDepartmentDropdown(): void {
    this.departmentDropdownOpen.update((v) => !v);
  }

  toggleStatusDropdown(): void {
    this.statusDropdownOpen.update((v) => !v);
  }

  selectDepartment(id: string, event: Event): void {
    event.stopPropagation();

    this.newDesignation.departmentId = id;

    this.departmentDropdownOpen.set(false);
  }

  selectStatus(status: string, event: Event): void {
    event.stopPropagation();

    this.newDesignation.status = status;

    this.statusDropdownOpen.set(false);
  }

  getDepartmentName(id: string): string {
    const dept = this.departments().find((x) => x.id == id);

    return dept?.name ?? 'Select Department';
  }

  readonly faFileExport = faFileExport;
  private readonly designationManagementService = inject(DesignationManagementService);
  readonly faBriefcase = faBriefcase;
  readonly isAddDesignationModalOpen = signal(false);

  readonly highestLevel = computed(() => {
    const designations = this.designations();

    if (!designations.length) {
      return 0;
    }

    return Math.max(...designations.map((x) => Number(x.level.replace('Level ', ''))));
  });

  readonly levelsUsed = computed(() => {
    return new Set(this.designations().map((x) => x.level)).size;
  });

  readonly departmentsCovered = computed(() => {
    return new Set(this.designations().map((x) => x.departmentId)).size;
  });

  readonly statsCards = computed(() => [
    {
      title: 'Total Designations',
      value: this.designations().length.toString(),
      subtitle: 'Across organization',
      icon: this.faUserTie,
      color: 'blue',
    },
    {
      title: 'Highest Level',
      value: this.highestLevel().toString(),
      subtitle: 'Top hierarchy order',
      icon: this.faBriefcase,
      color: 'green',
    },
    {
      title: 'Levels Used',
      value: this.levelsUsed().toString(),
      subtitle: 'Assigned levels',
      icon: this.faUsers,
      color: 'purple',
    },
    {
      title: 'Departments Covered',
      value: this.departmentsCovered().toString(),
      subtitle: 'Mapped departments',
      icon: this.faLayerGroup,
      color: 'orange',
    },
  ]);
  newDesignation = {
    title: '',
    departmentId: '',
    levelId: '',

    description: '',
    status: 'Active',
  };

  openAddDesignationModal(): void {
    this.designationSubmitted = false;

    this.designationErrors = {
      title: '',
      departmentId: '',
      levelId: '',
      description: '',
    };
    this.newDesignation = {
      title: '',
      departmentId: '',
      levelId: '',

      description: '',
      status: 'Active',
    };

    this.isAddDesignationModalOpen.set(true);
  }

  closeAddDesignationModal(): void {
    this.isAddDesignationModalOpen.set(false);

    this.designationSubmitted = false;

    this.designationErrors = {
      title: '',
      departmentId: '',
      levelId: '',
      description: '',
    };

    this.newDesignation = {
      title: '',
      departmentId: '',
      levelId: '',

      description: '',
      status: 'Active',
    };
  }

  private resetDesignationValidation(): void {
    this.designationSubmitted = false;

    this.designationErrors = {
      title: '',
      departmentId: '',
      levelId: '',
      description: '',
    };
  }
  editDesignation(item: any): void {
    this.resetDesignationValidation();
    this.designationManagementService.getDesignationById(item.id).subscribe((data: any) => {
      this.newDesignation = {
        title: data.title,
        departmentId: data.departmentId,
        levelId: data.levelId,

        description: data.description,
        status: data.status === 1 ? 'Active' : 'Inactive',
      };
      console.log('EDIT RESPONSE', data);
      this.selectedDesignation = item;

      this.cdr.detectChanges(); // <-- add this

      this.isEditDesignationModalOpen.set(true);
    });
  }

  closeEditDesignationModal(): void {
    this.isEditDesignationModalOpen.set(false);
    this.designationSubmitted = false;

    this.designationErrors = {
      title: '',
      departmentId: '',
      levelId: '',
      description: '',
    };
    this.selectedDesignation = null;
  }
  updateDesignation(): void {
    if (!this.validateDesignation()) {
      return;
    }
    if (!this.selectedDesignation?.id) {
      return;
    }

    const payload = {
      title: this.newDesignation.title,
      departmentId: this.newDesignation.departmentId,
      levelId: this.newDesignation.levelId,

      description: this.newDesignation.description,
      status: this.newDesignation.status === 'Active' ? 1 : 2,
    };
    console.log('UPDATE PAYLOAD', this.newDesignation);
    this.designationManagementService
      .updateDesignation(this.selectedDesignation.id, payload)
      .subscribe({
        next: () => {
          this.loadDesignations();
          this.closeEditDesignationModal();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  closeDeleteDesignationModal(): void {
    this.isDeleteDesignationModalOpen.set(false);
    this.selectedDesignation = null;
  }
  deleteDesignation(item: any): void {
    console.log('Delete', item);

    this.selectedDesignation = item;
    this.isDeleteDesignationModalOpen.set(true);
  }
  confirmDeleteDesignation(): void {
    console.log('DELETE CONFIRM CLICKED');

    if (!this.selectedDesignation?.id) {
      console.log('No designation selected');
      return;
    }

    console.log(this.selectedDesignation);

    this.designationManagementService.deleteDesignation(this.selectedDesignation.id).subscribe({
      next: () => {
        console.log('Delete Success');
        this.loadDesignations();
        this.closeDeleteDesignationModal();
      },
      error: (error) => {
        console.error('Delete Error', error);
      },
    });
  }
  handleQuickAction(action: string): void {
    switch (action) {
      case 'add':
        this.openAddDesignationModal();
        break;

      case 'assign':
        console.log('Assign Employees');
        break;

      case 'hierarchy':
        console.log('Edit Hierarchy');
        break;

      case 'export':
        console.log('Export Structure');
        break;
    }
  }
  readonly quickActions = signal([
    {
      label: 'Add Designation',
      icon: this.faPlus,
      action: 'add',
    },
    {
      label: 'Assign Employees',
      icon: this.faUserPlus,
      action: 'assign',
    },
    {
      label: 'Edit Hierarchy',
      icon: this.faSitemap,
      action: 'hierarchy',
    },
    {
      label: 'Export Structure',
      icon: this.faFileExport,
      action: 'export',
    },
  ]);
  saveDesignation(): void {
    if (!this.validateDesignation()) {
      return;
    }
    const payload = {
      title: this.newDesignation.title,
      departmentId: this.newDesignation.departmentId,
      levelId: this.newDesignation.levelId,

      description: this.newDesignation.description,
      status: this.newDesignation.status === 'Active' ? 1 : 2,
    };

    this.designationManagementService.createDesignation(payload).subscribe({
      next: () => {
        this.loadDesignations();
        this.closeAddDesignationModal();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  ngOnInit(): void {
    this.loadDesignations();
    this.loadDepartments();
    this.loadLevels();
    // this.loadDashboard();
  }
  // loadDashboard(): void {
  //   this.designationManagementService.loadDashboard().subscribe({
  //     next: (response: any) => {
  //       this.statsCards.update((cards) => [
  //         {
  //           ...cards[0],
  //           value: response.totalDesignations?.toString() ?? '0',
  //         },
  //         cards[1],
  //         cards[2],
  //         {
  //           ...cards[3],
  //           value: response.reportingLevels?.toString() ?? '0',
  //         },
  //       ]);
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     },
  //   });
  // }
  readonly designationTabs = signal([
    'All Levels',
    'Executive',
    'Management',
    'Technical',
    'Operations',
    'Support',
  ]);
  loadDepartments(): void {
    this.departmentManagementService.loadDepartments().subscribe({
      next: (response: any) => {
        this.departments.set(response);
      },
    });
  }
  loadDesignations(): void {
    this.designationManagementService.loadDesignations().subscribe({
      next: (response: any) => {
        console.log(response);
        this.designations.set(
          response.map((x: any) => ({
            id: x.id,
            title: x.title,
            departmentId: x.departmentId,

            level: `Level ${x.levelOrder}`,
            department: x.departmentName,
            status: x.status === 1 ? 'Active' : 'Inactive',
            employees: x.employeeCount ?? 0,
            description: x.description,
            color: 'technical',
          })),
        );

        this.hierarchy.set(
          response
            .sort((a: any, b: any) => a.levelOrder - b.levelOrder)
            .map((x: any) => ({
              title: x.title,
              level: `Level ${x.levelOrder}`,
              employees: x.employeeCount ?? 0,
              color:
                x.levelOrder === 1
                  ? 'purple'
                  : x.levelOrder === 2
                    ? 'blue'
                    : x.levelOrder === 3
                      ? 'green'
                      : 'orange',
            })),
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  readonly hierarchy = signal<any[]>([]);
  readonly designations = signal<any[]>([]);

  readonly distributions = signal([
    {
      title: 'Technical Roles',
      value: 54,
    },

    {
      title: 'Management Roles',
      value: 21,
    },

    {
      title: 'Operations Roles',
      value: 14,
    },

    {
      title: 'Support Roles',
      value: 11,
    },
  ]);

  designationErrors = {
    title: '',
    levelId: '',
    departmentId: '',
    description: '',
  };

  designationSubmitted = false;

  validateDesignation(): boolean {
    this.designationSubmitted = true;

    this.designationErrors = {
      title: '',
      departmentId: '',
      levelId: '',
      description: '',
    };

    let valid = true;

    if (!this.newDesignation.title?.trim()) {
      this.designationErrors.title = 'Designation name is required';
      valid = false;
    } else if (this.newDesignation.title.trim().length < 3) {
      this.designationErrors.title = 'Designation name must be at least 3 characters';
      valid = false;
    }

    if (!this.newDesignation.departmentId) {
      this.designationErrors.departmentId = 'Department is required';
      valid = false;
    }

    if (!this.newDesignation.levelId) {
      this.designationErrors.levelId = 'Level is required';
      valid = false;
    }

    if (this.newDesignation.description && this.newDesignation.description.length > 250) {
      this.designationErrors.description = 'Description cannot exceed 250 characters';
      valid = false;
    }

    return valid;
  }

  toggleLevelDropdown(): void {
    this.levelDropdownOpen.update((v) => !v);
  }

  selectLevel(levelId: string, event: Event) {
    event.stopPropagation();

    this.newDesignation.levelId = levelId;

    this.levelDropdownOpen.set(false);
  }

  getLevelName(levelId: string): string {
    return this.levels().find((x) => x.id === levelId)?.levelName ?? '';
  }
  loadLevels(): void {
    this.levelManagementService.loadLevels().subscribe({
      next: (response: any) => {
        console.log('LEVELS RESPONSE', response);
        this.levels.set(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
