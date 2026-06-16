import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

const COLUMNS = [
  {
    title: 'Product',
    links: ['Features', 'AI Copilot', 'Integrations', 'Changelog'],
  },
  {
    title: 'Solutions',
    links: ['Startups', 'SMEs', 'Enterprise', 'Global Teams', 'HR Teams'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API', 'Blog', 'Guides', 'Community'],
  },
  {
    title: 'Company',
    links: ['Pricing', 'Security', 'Careers', 'Contact', 'About'],
  },
];

const SOCIALS = [
  { icon: 'fa-x-twitter', label: 'Twitter' },
  { icon: 'fa-linkedin', label: 'LinkedIn' },
  { icon: 'fa-github', label: 'GitHub' },
  { icon: 'fa-discord', label: 'Community' },
];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly columns = COLUMNS;
  readonly socials = SOCIALS;
  readonly email = signal('');
  readonly year = new Date().getFullYear();

  onSubmit(event: Event): void {
    event.preventDefault();
  }

  updateEmail(value: string): void {
    this.email.set(value);
  }
}
