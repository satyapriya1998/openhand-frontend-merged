import { Component, HostListener, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { HeroComponent } from '../components/hero/hero.component';
import { TrustedByComponent } from '../components/trusted-by/trusted-by.component';
import { AiCopilotComponent } from '../components/ai-copilot/ai-copilot.component';
import { FeaturesComponent } from '../components/features/features.component';
import { BuilderComponent } from '../components/builder/builder.component';
import { MigrationComponent } from '../components/migration/migration.component';
import { AnalyticsComponent } from '../components/analytics/analytics.component';
import { SecurityComponent } from '../components/security/security.component';
import { ComparisonComponent } from '../components/comparison/comparison.component';
import { TestimonialsComponent } from '../components/testimonials/testimonials.component';
import { PricingComponent } from '../components/pricing/pricing.component';
import { FaqComponent } from '../components/faq/faq.component';
import { FinalCtaComponent } from '../components/final-cta/final-cta.component';
import { FooterComponent } from '../components/footer/footer.component';
import { GlobalMouseParallaxDirective } from '../shared/directives/global-mouse-parallax.directive';
import { SeoService } from '../core/seo.service';

@Component({
  selector: 'app-landing-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    TrustedByComponent,
    AiCopilotComponent,
    FeaturesComponent,
    BuilderComponent,
    MigrationComponent,
    AnalyticsComponent,
    SecurityComponent,
    ComparisonComponent,
    TestimonialsComponent,
    PricingComponent,
    FaqComponent,
    FinalCtaComponent,
    FooterComponent,
    GlobalMouseParallaxDirective,
  ],
  templateUrl: './landing-home.component.html',
  styleUrl: './landing-home.component.scss',
})
export class LandingHomeComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly scrollProgress = signal(0);
  private lastScrollTime = 0;
  private readonly scrollThrottle = 16;

  ngOnInit(): void {
    this.seo.update({
      title: 'Knodtecone HRMS — AI-Powered HRMS Built for the Future of Work',
      description:
        'Manage people, projects, assets, onboarding, compliance, and workforce intelligence from one intelligent platform. SOC 2 ready, multi-language, multi-currency.',
      keywords: [
        'HRMS',
        'AI HR',
        'HR software',
        'human resources',
        'employee management',
        'payroll',
        'onboarding',
        'workforce analytics',
        'HR copilot',
        'enterprise HR',
        'Knodtecone',
      ],
      url: 'https://knodtecone.com/',
    });

    this.seo.setJsonLd([
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Knodtecone',
        url: 'https://knodtecone.com/',
        logo: 'https://knodtecone.com/icon.svg',
        sameAs: [
          'https://twitter.com/knodtecone',
          'https://www.linkedin.com/company/knodtecone',
          'https://github.com/knodtecone',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Knodtecone HRMS',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description:
          'AI-Powered HRMS for managing people, projects, assets, onboarding, compliance, and workforce intelligence.',
        offers: [
          { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Growth', price: '35', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Business', price: '119', priceCurrency: 'USD' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '2843',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How secure is Knodtecone?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Knodtecone uses multi-tenant architecture with end-to-end encryption, RBAC, MFA, audit logs, and data isolation. SOC 2-ready, GDPR-ready, ISO 27001-aligned.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I migrate from my current HRMS?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. One-click import, bulk migration, CSV imports, automatic data validation, and smart field mapping. Most teams go live in days.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there a free plan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — up to 10 employees, free forever, no credit card required.',
            },
          },
        ],
      },
    ]);

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.onScroll(), 50);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const now = performance.now();
    if (now - this.lastScrollTime < this.scrollThrottle) {
      return;
    }
    this.lastScrollTime = now;
    
    const doc = document.documentElement;
    const max = (doc.scrollHeight - doc.clientHeight) || 1;
    const progress = Math.min(1, Math.max(0, window.scrollY / max));

    this.scrollProgress.set(progress);
    doc.style.setProperty('--scroll-y', String(progress));
  }
}