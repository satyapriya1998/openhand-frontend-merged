import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { StatsCards } from '../../../shared/components/stats-cards/stats-cards';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { PageHeader } from '../../../shared/components/page-header/page-header.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { LevelManagementService } from '../../../core/services/level-management.service';

import {
  faPlus,
  faSearch,
  faSitemap,
  faUsers,
  faUserTie,
  faLayerGroup,
  faPlusCircle,
  faList,
  faChartBar,
  faFileExport,
  faPenToSquare,
  faTrashCan,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { ManagementTable } from '../../../shared/components/management-table/management-table';
import { QuickActions } from '../../../shared/components/quick-actions/quick-actions';
import { PageLayout } from '../../../shared/components/page-layout/page-layout';
import { PageSubHeader } from '../../../shared/components/page-sub-header/page-sub-header';
@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    Breadcrumbs,
    PageHeader,
    ModalComponent,
    StatsCards,
    ManagementTable,
    QuickActions,
    PageLayout,
    PageSubHeader
  ],
  templateUrl: './levels.html',
  styleUrl: './levels.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
 faBolt=faBolt;
  readonly faPlus = faPlus;
  readonly faSearch = faSearch;
  readonly faSitemap = faSitemap;
  readonly faUsers = faUsers;
  readonly faUserTie = faUserTie;
  readonly faLayerGroup = faLayerGroup;
  readonly faEdit = faPenToSquare;
  readonly faDelete = faTrashCan;
  faPlusCircle = faPlusCircle;
  faList = faList;
  faChartBar = faChartBar;
  faFileExport = faFileExport;
  readonly totalLevels = signal(0);
  readonly totalDesignations = signal(0);

  readonly isAddLevelModalOpen = signal(false);
  readonly isDeleteLevelModalOpen = signal(false);

  readonly selectedLevel = signal<any | null>(null);

  readonly searchTerm = signal('');

  readonly allLevels = signal<any[]>([]);
  private readonly levelManagementService = inject(LevelManagementService);
  readonly levels = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) {
      return this.allLevels();
    }

    return this.allLevels().filter(
      (level) =>
        level.name?.toLowerCase().includes(term) || level.description?.toLowerCase().includes(term),
    );
  });
  readonly highestLevel = computed(() => {
    const levels = this.allLevels();

    if (!levels.length) {
      return 0;
    }

    return Math.max(...levels.map((x) => x.levelOrder));
  });

  readonly averageRolesPerLevel = computed(() => {
    const totalLevels = this.totalLevels();

    if (!totalLevels) {
      return '0';
    }

    return (this.totalDesignations() / totalLevels).toFixed(1);
  });
  readonly statsCards = computed(() => [
    {
      title: 'Total Levels',
      value: this.totalLevels().toString(),
      subtitle: 'Hierarchy levels',
      icon: this.faLayerGroup,
      color: 'blue',
    },

    {
      title: 'Mapped Designations',
      value: this.totalDesignations().toString(),
      subtitle: 'Assigned roles',
      icon: this.faUsers,
      color: 'green',
    },
    {
      title: 'Highest Level',
      value: this.highestLevel().toString(),
      subtitle: 'Highest order',
      icon: this.faUserTie,
      color: 'purple',
    },
    {
      title: 'Avg Roles / Level',
      value: this.averageRolesPerLevel(),
      subtitle: 'Designation distribution',
      icon: this.faSitemap,
      color: 'orange',
    },
  ]);

  readonly levelForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],

    levelOrder: [1, [Validators.required, Validators.min(1), Validators.max(99)]],

    status: ['Active', Validators.required],

    description: ['', [Validators.maxLength(250)]],
  });

  ngOnInit(): void {
    this.loadLevels();
  }

  isInvalid(field: string): boolean {
    const control = this.levelForm.get(field);

    return !!control && control.invalid && control.touched;
  }

  isValid(field: string): boolean {
    const control = this.levelForm.get(field);

    return !!control && control.valid && control.touched;
  }

  getError(field: string): string {
    const control = this.levelForm.get(field);

    if (!control?.errors) return '';

    if (control.errors['required']) {
      return `${field} is required`;
    }

    if (control.errors['minlength']) {
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    }

    if (control.errors['maxlength']) {
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed`;
    }

    if (control.errors['min']) {
      return 'Value is too small';
    }

    if (control.errors['max']) {
      return 'Value is too large';
    }

    return 'Invalid value';
  }

  openAddLevelModal(): void {
    this.selectedLevel.set(null);

    this.resetLevelForm();

    this.isAddLevelModalOpen.set(true);
  }

  closeAddLevelModal(): void {
    this.isAddLevelModalOpen.set(false);

    this.resetLevelForm();
  }

  resetLevelForm(): void {
    this.levelForm.reset({
      name: '',
      levelOrder: 1,
      description: '',
      status: 'Active',
    });
  }

  saveLevel(): void {
    this.levelForm.markAllAsTouched();

    if (this.levelForm.invalid) {
      return;
    }

    const payload = {
      name: this.levelForm.value.name,
      levelOrder: this.levelForm.value.levelOrder,
      description: this.levelForm.value.description,
    };

    const selected = this.selectedLevel();

    if (selected) {
      this.levelManagementService.updateLevel(selected.id, payload).subscribe({
        next: () => {
          this.loadLevels();
          this.closeAddLevelModal();
        },
        error: (error) => {
          console.error(error);
        },
      });

      return;
    }
    this.levelManagementService.createLevel(payload).subscribe({
      next: () => {
        this.loadLevels();
        this.closeAddLevelModal();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editLevel(level: any): void {
    this.levelManagementService.getLevelById(level.id).subscribe({
      next: (response: any) => {
        this.selectedLevel.set({
          ...response,
          id: level.id,
        });

        this.levelForm.patchValue({
          name: response.name,
          levelOrder: response.levelOrder,
          description: response.description,
        });

        this.isAddLevelModalOpen.set(true);
      },
    });
  }

  confirmDeleteLevel(level: any): void {
    this.selectedLevel.set(level);

    this.isDeleteLevelModalOpen.set(true);
  }

  closeDeleteLevelModal(): void {
    this.isDeleteLevelModalOpen.set(false);
  }

  deleteLevel(): void {
    const selected = this.selectedLevel();

    if (!selected?.id) {
      return;
    }

    this.levelManagementService.deleteLevel(selected.id).subscribe({
      next: () => {
        this.loadLevels();
        this.closeDeleteLevelModal();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  readonly quickActions = signal([
    {
      label: 'Add Level',
      icon: this.faPlusCircle,
      action: 'add',
    },
    {
      label: 'Level List',
      icon: this.faList,
      action: 'list',
    },
    {
      label: 'Hierarchy',
      icon: this.faSitemap,
      action: 'hierarchy',
    },
    {
      label: 'Reports',
      icon: this.faChartBar,
      action: 'report',
    },
  ]);

  handleQuickAction(action: string): void {
    switch (action) {
      case 'add':
        this.openAddLevelModal();
        break;

      case 'list':
        window.scrollTo({
          top: 400,
          behavior: 'smooth',
        });
        break;

      default:
        break;
    }
  }

  // readonly hierarchyLevels = signal([
  //   {
  //     order: 1,
  //     name: 'Level 1',
  //   },
  //   {
  //     order: 2,
  //     name: 'Level 2',
  //   },
  //   {
  //     order: 3,
  //     name: 'Level 3',
  //   },
  //   {
  //     order: 4,
  //     name: 'Level 4',
  //   },
  //   {
  //     order: 5,
  //     name: 'Level 5',
  //   },
  // ]);
  readonly hierarchyLevels = signal<any[]>([]);
  loadLevels(): void {
    this.levelManagementService.loadLevels().subscribe({
      next: (response: any[]) => {
        const levels = response.map((x) => ({
          id: x.id,
          name: x.levelName,
          levelOrder: x.levelOrder,
          description: x.description,
          designationCount: x.designationCount ?? 0,
          status: x.status === 1 ? 'Active' : 'Inactive',
        }));

        this.allLevels.set(levels);

        this.totalLevels.set(levels.length);

        this.totalDesignations.set(levels.reduce((sum, item) => sum + item.designationCount, 0));

        this.hierarchyLevels.set(
          [...levels]
            .sort((a, b) => a.levelOrder - b.levelOrder)
            .map((x) => ({
              order: x.levelOrder,
              name: x.name,
            })),
        );
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
