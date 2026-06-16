import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  route?: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './breadcrumbs.html',
  styleUrls: ['./breadcrumbs.scss'],
})
export class Breadcrumbs implements OnInit {
  @Input() items: BreadcrumbItem[] = [];
  first = true;
  faHouse = faHouse;
  faChevronRight = faChevronRight;
  breadcrumbs: BreadcrumbItem[] = [];
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.buildBreadcrumbs();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.buildBreadcrumbs();
    });
  }
  private buildBreadcrumbs(): void {
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: 'Home',
        route: '/dashboard',
      },
    ];

    let currentRoute: ActivatedRoute | null = this.activatedRoute.root;

    let url = '';

    while (currentRoute) {
      const childRoute: ActivatedRoute | null = currentRoute.firstChild;

      if (!childRoute) {
        break;
      }

      const routeURL = childRoute.snapshot.url.map((segment) => segment.path).join('/');

      if (routeURL) {
        url += `/${routeURL}`;
      }

      const label = childRoute.snapshot.data['breadcrumb'];

      if (label) {
        breadcrumbs.push({
          label,
          route: childRoute.routeConfig?.loadChildren ? undefined : url,
        });
      }

      currentRoute = childRoute;
    }

    this.breadcrumbs = breadcrumbs;
  }
}
