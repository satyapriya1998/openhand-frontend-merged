import { Component, computed, signal } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { RevealDirective } from '../../shared/reveal.directive';

interface Faq {
  q: string;
  a: string;
  cat: string;
}

const FAQS: Faq[] = [
  { q: 'How secure is Knodtecone?', cat: 'Security',
    a: 'Knodtecone is built on a multi-tenant architecture with end-to-end encryption, role-based access control, MFA, audit logs, and data isolation. We follow GDPR-ready and SOC 2-ready architecture standards with a 99.99% uptime SLA.' },
  { q: 'Can I migrate from my current HRMS?', cat: 'Migration',
    a: 'Yes. With one-click import, bulk employee migration, CSV imports, and automatic data validation, most teams fully migrate in days — not months. You can export your data anytime with no vendor lock-in.' },
  { q: 'Is there a free plan?', cat: 'Pricing',
    a: 'Absolutely. Our Free plan supports up to 10 employees with core HR tools, leave management, and an employee directory — free forever, no credit card required.' },
  { q: 'Do you support multiple languages?', cat: 'i18n',
    a: 'Yes. Knodtecone supports English, Hindi, German, French, Spanish, and Arabic out of the box, with full internationalization and multi-currency support for global teams.' },
  { q: 'Can I customize workflows?', cat: 'Platform',
    a: 'Our no-code workflow builder lets you create custom approval chains, dynamic forms, and automated notifications. Drag-and-drop dashboards make every workspace organization-specific.' },
  { q: 'Do you offer APIs?', cat: 'Platform',
    a: 'Yes. Modern REST APIs are available on the Business and Enterprise plans, enabling custom integrations with your existing tools and infrastructure.' },
  { q: 'What deployment options exist?', cat: 'Platform',
    a: 'Knodtecone is 100% cloud-native with zero-downtime deployments. Enterprise customers can also access dedicated environments, custom integrations, and SLA guarantees.' },
  { q: 'How does the AI Copilot handle sensitive data?', cat: 'AI',
    a: 'Our AI Copilot runs on private, isolated models trained on your organization\'s anonymized data. No customer data is used to train shared models, and all processing is encrypted in transit and at rest.' },
  { q: 'Do you offer a free trial of paid plans?', cat: 'Pricing',
    a: 'Yes — every paid plan includes a 14-day free trial with full feature access. No credit card required, and you can downgrade or cancel at any time.' },
];

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [SectionHeadingComponent, RevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  readonly faqs = FAQS;
  readonly open = signal<number | null>(0);
  readonly query = signal('');

  readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return FAQS;
    return FAQS.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q) || f.cat.toLowerCase().includes(q),
    );
  });

  toggle(index: number): void {
    this.open.update((current) => (current === index ? null : index));
  }

  isOpen(index: number): boolean {
    return this.open() === index;
  }

  setQuery(value: string): void {
    this.query.set(value);
    // Auto-open the first matching result so users see context immediately
    if (value.trim() && this.filtered().length > 0) {
      const firstIdx = this.faqs.findIndex((f) => f === this.filtered()[0]);
      this.open.set(firstIdx >= 0 ? firstIdx : 0);
    }
  }
}
