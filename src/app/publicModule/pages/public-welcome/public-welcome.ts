// public-welcome.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface HrComment {
  id: number;
  author: string;
  comment: string;
  date: Date;
  isAdmin: boolean;
}

interface OnboardingStep {
  id: number;
  title: string;
  shortText: string;
  description: string;
  status: 'completed' | 'pending' | 'rejected';
  updatedOn: string;
  documents: string[];
}

@Component({
  selector: 'app-public-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './public-welcome.html',
  styleUrl: './public-welcome.scss',
})
export class PublicWelcome {

  employeeName = 'Kiran Kumar';

  employeeRole = 'Senior Software Engineer';

  employeeId = 'KDT-EMP-2024-018';

  department = 'Engineering';

  manager = 'Rahul Sharma';

  location = 'Bangalore';

  joiningDate = '15 Mar 2024';

  onboardingProgress = 68;

  selectedStepId = 1;

  onboardingSteps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Application Review',
      shortText: 'Recruitment approved',
      description:
        'Your profile and recruitment process has been completed successfully. The recruitment team has approved your application.',
      status: 'completed',
      updatedOn: 'Feb 12, 2024',
      documents: [
        'Resume',
        'Application Form',
        'Portfolio'
      ]
    },
    {
      id: 2,
      title: 'Document Verification',
      shortText: 'Pending corrections',
      description:
        'Some uploaded documents require correction before HR can continue the onboarding process.',
      status: 'pending',
      updatedOn: 'Feb 24, 2024',
      documents: [
        'PAN Card',
        'Address Proof',
        'Photo ID'
      ]
    },
    {
      id: 3,
      title: 'Background Check',
      shortText: 'Verification completed',
      description:
        'Background verification and employment verification completed successfully.',
      status: 'completed',
      updatedOn: 'Feb 28, 2024',
      documents: [
        'Employment Verification',
        'Education Verification'
      ]
    },
    {
      id: 4,
      title: 'Photo Submission',
      shortText: 'Rejected by HR',
      description:
        'Uploaded image does not match onboarding requirements. Please upload a new high-resolution image with white background.',
      status: 'rejected',
      updatedOn: 'Mar 01, 2024',
      documents: [
        'Passport Photo'
      ]
    },
    {
      id: 5,
      title: 'Offer Letter',
      shortText: 'Waiting for approval',
      description:
        'Offer letter generation will start after pending onboarding corrections are completed.',
      status: 'pending',
      updatedOn: 'Pending',
      documents: [
        'Offer Letter',
        'NDA Agreement'
      ]
    }
  ];

  hrComments: HrComment[] = [
    {
      id: 1,
      author: 'HR Team',
      comment:
        'Your educational verification is complete. Please update your passport-size photo.',
      date: new Date('2024-02-26'),
      isAdmin: true
    },
    {
      id: 2,
      author: 'Kiran Kumar',
      comment:
        'Sure, I will upload the updated photo today.',
      date: new Date('2024-02-27'),
      isAdmin: false
    }
  ];

  newComment = '';

  get selectedStep(): OnboardingStep {
    return this.onboardingSteps.find(
      x => x.id === this.selectedStepId
    )!;
  }

  selectStep(stepId: number): void {
    this.selectedStepId = stepId;
  }

  addComment(): void {

    if (!this.newComment.trim()) {
      return;
    }

    this.hrComments.unshift({
      id: this.hrComments.length + 1,
      author: this.employeeName,
      comment: this.newComment,
      date: new Date(),
      isAdmin: false
    });

    this.newComment = '';
  }

  getStatusLabel(status: string): string {

    switch (status) {

      case 'completed':
        return 'Completed';

      case 'rejected':
        return 'Rejected';

      default:
        return 'Pending';
    }
  }

  formatDate(date: Date): string {

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}