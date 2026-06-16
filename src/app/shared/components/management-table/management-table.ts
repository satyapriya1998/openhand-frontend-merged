import { Component, input } from '@angular/core';
import { faTable, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PageSubHeader } from '../page-sub-header/page-sub-header';
import { faChevronLeft, faChevronRight, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-management-table',
  standalone: true,
  imports: [PageSubHeader, FontAwesomeModule],
  templateUrl: './management-table.html',
  styleUrl: './management-table.scss',
})
export class ManagementTable {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faList = faList;
  title = input.required<string>();
  subtitle = input.required<string>();
  icon = input<IconDefinition>(faTable);
}


