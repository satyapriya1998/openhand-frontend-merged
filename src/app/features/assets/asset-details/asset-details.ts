
import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { PageHeader } from '../../../shared/components/page-header/page-header.component';
import { faArrowLeft, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { PageSubHeader } from '../../../shared/components/page-sub-header/page-sub-header';
import {
  faLocationDot,
  faIndianRupeeSign,
  faMicrochip,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-asset-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, Breadcrumbs, PageSubHeader, PageHeader],
  templateUrl: './asset-details.html',
  styleUrl: './asset-details.scss',
})
export class AssetDetails {
  readonly faArrowLeft = faArrowLeft;
  readonly faLaptop = faLaptop;
  readonly faMicrochip = faMicrochip;
  readonly faLocationDot = faLocationDot;
  readonly faIndianRupeeSign = faIndianRupeeSign;
  constructor(private location: Location) {}
  readonly faBuilding = faBuilding;

  goBack(): void {
    this.location.back();
  }

  assetInfoCards = [
    {
      title: 'Category',
      value: 'Laptop',
      subtitle: 'Asset Type',
      color: 'primary',
      icon: faLaptop,
    },
    {
      title: 'Brand',
      value: 'Apple',
      subtitle: 'Manufacturer',
      color: 'success',
      icon: faMicrochip,
    },
    {
      title: 'Model',
      value: '14" M3',
      subtitle: 'MacBook Pro',
      color: 'violet',
      icon: faMicrochip,
    },
    {
      title: 'Location',
      value: 'BLR',
      subtitle: 'Bangalore',
      color: 'warning',
      icon: faLocationDot,
    },
  ];
}