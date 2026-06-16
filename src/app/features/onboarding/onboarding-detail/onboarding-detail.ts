import { ChangeDetectionStrategy, Component, signal, WritableSignal, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { Breadcrumbs } from '../../../shared/components/breadcrumbs/breadcrumbs';
import { PageHeader } from '../../../shared/components/page-header/page-header.component';
import { TabsComponent } from '../../../shared/components/tabs/tabs';
import {
  faUser,
  faLocationDot,
  faGraduationCap,
  faBriefcase,
  faFolderOpen,
  faBuildingColumns,
  faPhone,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faComment,
  faPaperPlane,
  faEye,
  faDownload,
  faFileAlt,
  faIdCard,
  faPassport,
  faCertificate,
  faEnvelope,
  faCalendarAlt,
  faVenusMars,
  faHeart,
  faFlag,
  faTint,
  faHome,
  faCity,
  faMapPin,
  faGlobe,
  faPlus,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { PageSubHeader } from '../../../shared/components/page-sub-header/page-sub-header';
import { PageLayout } from '../../../shared/components/page-layout/page-layout';

interface Tab {
  id: string;
  label: string;
  icon: any;
}

interface ModuleStatus {
  status: 'pending' | 'approved' | 'correction' | 'rejected';
  comment: string;
  reviewedBy?: string;
  reviewedDate?: string;
}

@Component({
  selector: 'app-onboarding-detail',
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ModalComponent,
    Breadcrumbs,
    PageHeader,
    TabsComponent,
    PageSubHeader,
    PageLayout
  ],
  templateUrl: './onboarding-detail.html',
  styleUrls: ['./onboarding-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingDetail {
  // Icons
  faPlus = faPlus;
  faFilter = faFilter;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faCalendarAlt = faCalendarAlt;
  faVenusMars = faVenusMars;
  faHeart = faHeart;
  faFlag = faFlag;
  faTint = faTint;
  faLocationDot = faLocationDot;
  faGraduationCap = faGraduationCap;
  faBriefcase = faBriefcase;
  faFolderOpen = faFolderOpen;
  faBuildingColumns = faBuildingColumns;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faClock = faClock;
  faComment = faComment;
  faPaperPlane = faPaperPlane;
  faEye = faEye;
  faDownload = faDownload;
  faFileAlt = faFileAlt;
  faIdCard = faIdCard;
  faPassport = faPassport;
  faCertificate = faCertificate;
  faHome = faHome;
  faCity = faCity;
  faMapPin = faMapPin;
  faGlobe = faGlobe;

  // @Input() isOpen = signal(false);
  // @Output() onClose = new EventEmitter<void>();
 
  activeTab = signal<string>('personal');

  tabs: Tab[] = [
    { id: 'personal', label: 'Personal Info', icon: faUser },
    { id: 'address', label: 'Address', icon: faLocationDot },
    { id: 'education', label: 'Education', icon: faGraduationCap },
    { id: 'experience', label: 'Experience', icon: faBriefcase },
    { id: 'documents', label: 'Documents', icon: faFolderOpen },
    { id: 'bank', label: 'Bank Details', icon: faBuildingColumns },
    { id: 'emergency', label: 'Emergency', icon: faPhone },
  ];
  moduleComments: { [key: string]: string } = {
    personal: '',
    address: '',
    education: '',
    experience: '',
    documents: '',
    bank: '',
    emergency: '',
  };

  moduleStatuses: { [key: string]: ModuleStatus } = {
    personal: { status: 'pending', comment: '' },
    address: { status: 'pending', comment: '' },
    education: { status: 'pending', comment: '' },
    experience: { status: 'pending', comment: '' },
    documents: { status: 'pending', comment: '' },
    bank: { status: 'pending', comment: '' },
    emergency: { status: 'pending', comment: '' },
  };

  setActiveTab(tabId: string) {
    this.activeTab.set(tabId);
  }

  getModuleStatus(moduleId: string): ModuleStatus {
    return this.moduleStatuses[moduleId];
  }

  getStatusIcon(status: string): any {
    switch (status) {
      case 'approved':
        return this.faCheckCircle;
      case 'rejected':
        return this.faTimesCircle;
      case 'correction':
        return this.faClock;
      default:
        return this.faClock;
    }
  }

  approveModule(moduleId: string) {
    this.moduleStatuses[moduleId].status = 'approved';
    this.moduleStatuses[moduleId].comment = this.moduleComments[moduleId];
    this.moduleStatuses[moduleId].reviewedDate = new Date().toISOString();
  }

  requestCorrection(moduleId: string) {
    this.moduleStatuses[moduleId].status = 'correction';
    this.moduleStatuses[moduleId].comment = this.moduleComments[moduleId];
  }

  rejectModule(moduleId: string) {
    this.moduleStatuses[moduleId].status = 'rejected';
    this.moduleStatuses[moduleId].comment = this.moduleComments[moduleId];
  }
  openAddEmployeeModal(): void {
    console.log('Open Add Employee Modal');
  }
  // close() {
  //   this.onClose.emit();
  // }
}
