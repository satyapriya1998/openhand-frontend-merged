
import { Component, OnInit, inject, signal, computed, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

import {
  faBuilding,
  faFileShield,
  faGear,
  faUser,
  faPen,
  faXmark,
  faDownload,
   faCalendarDays
} from '@fortawesome/free-solid-svg-icons';

import { TabsComponent, Tab } from '../../../shared/components/tabs/tabs';

import { PageHeader } from '../../../shared/components/page-header/page-header.component';

import {
  ActivatedRoute,
  Router,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-leaves-main',
  imports: [CommonModule, FontAwesomeModule, Breadcrumbs, PageHeader, ModalComponent, TabsComponent, RouterOutlet],
  templateUrl: './leaves-main.html',
  styleUrl: './leaves-main.scss',
})
export class LeavesMain {

      readonly faUser = faUser;
    readonly faCalendarDays = faCalendarDays;

   leaveDetails = signal<any>(null);

    // readonly activeTab = signal('details');


     private router = inject(Router);
  private route = inject(ActivatedRoute);

  // tabs = [
  //   { label: 'Details', value: 'details' },
  //   { label: 'List', value: 'list' },
  //   { label: 'Apply', value: 'apply' },
  // ];


    readonly tabs: Tab[] = [
    {
      id: 'details',
      label: 'Leaves Details',
      icon: faUser,
    },

    {
      id: 'list',
      label: 'Leave List',
      icon: faUser,
    },
    {
      id: 'apply',
      label: 'Apply Leave',
      icon: faUser
    },
     {
      id: 'approval',
      label: 'Leave Approval',
      icon: faUser
    },
       {
      id: 'employee-leaves',
      label: 'Employee Leaves',
      icon: faUser
    },
        {
      id: 'my-team',
      label: 'My Team',
      icon: faUser
    },

  ];

  activeTab = computed(() => {
    const child = this.route.firstChild;
    return child?.snapshot.url[0]?.path || 'details';
  });

  onTabChange(tab: string) {
    this.router.navigate([tab], {
      relativeTo: this.route,
    });
  }

}
