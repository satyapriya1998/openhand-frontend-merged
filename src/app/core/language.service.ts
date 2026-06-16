import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  CURRENCIES,
  LANGUAGES,
  formatPrice as formatPriceFn,
  getLanguageCode,
  isRtl,
  translations,
  type Currency,
  type Language,
} from './locale';

export { CURRENCIES, LANGUAGES };
export type { Currency, Language };

/**
 * Legacy wrapper kept for backward-compat; the canonical implementation now
 * lives in `core/locale.ts` & `core/language.service.ts`.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly language = signal<Language>('English');
  readonly currency = signal<Currency>('INR');
  readonly t = computed(() => translations[this.language()]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.applyDocumentLocale(this.language());
    }
  }

  setLanguage(language: Language): void {
    this.language.set(language);
    if (isPlatformBrowser(this.platformId)) this.applyDocumentLocale(language);
  }

  setCurrency(currency: Currency): void {
    this.currency.set(currency);
  }

  formatPrice(monthlyInr: number | null, yearly: boolean): string {
    return formatPriceFn(
      monthlyInr,
      this.currency(),
      yearly,
      this.t().pricing.custom,
    );
  }

  private applyDocumentLocale(language: Language): void {
    document.documentElement.lang = getLanguageCode(language);
    document.documentElement.dir = isRtl(language) ? 'rtl' : 'ltr';
  }
}
