import {
  Component,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CURRENCIES,
  LANGUAGES,
  LocaleService,
  type Currency,
  type Language,
} from '../../services/locale.service';
import { ThemeService } from '../../services/theme.service';

interface NavMegaItem {
  icon: string;
  label: string;
  desc: string;
}
interface NavMegaSection {
  title: string;
  items: NavMegaItem[];
}
interface NavEntry {
  label: 'Product' | 'Features' | 'Solutions' | 'Pricing' | 'Security' | 'Resources' | 'Contact';
  href: string;
  mega?: NavMegaSection[];
}

const NAV: readonly NavEntry[] = [
  {
    label: 'Product',
    href: '#product',
    mega: [
      {
        title: 'Platform',
        items: [
          { icon: 'fa-robot', label: 'AI Copilot', desc: 'Conversational HR assistant' },
          { icon: 'fa-chart-line', label: 'Analytics', desc: 'Real-time workforce intelligence' },
          { icon: 'fa-table-cells-large', label: 'Dashboard Builder', desc: 'No-code customization' },
          { icon: 'fa-shield-halved', label: 'Security', desc: 'Enterprise-grade protection' },
        ],
      },
      {
        title: 'Capabilities',
        items: [
          { icon: 'fa-user-plus', label: 'Onboarding', desc: 'Automated digital workflows' },
          { icon: 'fa-calendar-days', label: 'Leave', desc: 'Smart approvals & calendar' },
          { icon: 'fa-boxes-stacked', label: 'Assets', desc: 'Lifecycle tracking' },
          { icon: 'fa-wallet', label: 'Payroll', desc: 'Multi-region integrations' },
        ],
      },
    ],
  },
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Security', href: '#security' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
] as const;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  readonly locale = inject(LocaleService);
  readonly theme = inject(ThemeService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly navItems: readonly NavEntry[] = NAV;
  readonly languages = LANGUAGES;
  readonly currencies = CURRENCIES;

  readonly scrolled = signal(false);
  readonly mobileOpen = signal(false);
  readonly langOpen = signal(false);
  readonly currencyOpen = signal(false);
  readonly mobileLangOpen = signal(false);
  readonly mobileCurrencyOpen = signal(false);
  readonly activeMega = signal<string | null>(null);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 16);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 16);
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('[data-dropdown="lang"]')) {
      this.langOpen.set(false);
      this.mobileLangOpen.set(false);
    }
    if (!target.closest('[data-dropdown="currency"]')) {
      this.currencyOpen.set(false);
      this.mobileCurrencyOpen.set(false);
    }
    if (!target.closest('[data-mega]')) {
      this.activeMega.set(null);
    }
  }

  navLabel(item: NavEntry): string {
    const map = this.locale.t().nav;
    return map[item.label];
  }

  navHref(item: NavEntry): string {
    return item.href;
  }

  hasMega(item: NavEntry): boolean {
    return !!item.mega;
  }

  megaSections(item: NavEntry): NavMegaSection[] {
    return item.mega ?? [];
  }

  setLanguage(language: Language, mobile = false): void {
    this.locale.setLanguage(language);
    this.langOpen.set(false);
    this.mobileLangOpen.set(false);
    if (mobile) this.mobileOpen.set(true);
  }

  setCurrency(currency: Currency, mobile = false): void {
    this.locale.setCurrency(currency);
    this.currencyOpen.set(false);
    this.mobileCurrencyOpen.set(false);
    if (mobile) this.mobileOpen.set(true);
  }

  toggleMobile(): void {
    this.mobileOpen.update((open) => !open);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  toggleLang(mobile = false): void {
    if (mobile) {
      this.mobileLangOpen.update((open) => !open);
      this.mobileCurrencyOpen.set(false);
    } else {
      this.langOpen.update((open) => !open);
      this.currencyOpen.set(false);
    }
  }

  toggleCurrency(mobile = false): void {
    if (mobile) {
      this.mobileCurrencyOpen.update((open) => !open);
      this.mobileLangOpen.set(false);
    } else {
      this.currencyOpen.update((open) => !open);
      this.langOpen.set(false);
    }
  }

  setMega(label: string | null): void {
    this.activeMega.set(label);
  }
}
