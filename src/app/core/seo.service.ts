import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  author?: string;
}

/**
 * Centralised SEO + Open Graph + Twitter Card + JSON-LD service.
 * Designed to be SSR-safe (does not touch the DOM when not in browser).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly origin = 'https://knodtecone.com';

  update(config: SeoConfig): void {
    const {
      title,
      description,
      url = this.origin + '/',
      image = this.origin + '/og-image.png',
      type = 'website',
      keywords = [],
      author = 'Knodtecone HRMS',
    } = config;

    this.title.setTitle(title);

    const tags: Array<{ name?: string; property?: string; content: string }> = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      { name: 'author', content: author },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { name: 'theme-color', content: '#0b0f1f' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:site', content: '@knodtecone' },
      { property: 'og:type', content: type },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:site_name', content: 'Knodtecone HRMS' },
      { property: 'og:locale', content: 'en_US' },
    ];

    for (const tag of tags) {
      const selector = tag.name ? `name="${tag.name}"` : `property="${tag.property}"`;
      this.meta.updateTag({ ...tag } as any, selector);
    }

    this.setCanonical(url);
  }

  setJsonLd(payload: Record<string, unknown> | Record<string, unknown>[]): void {
    if (!this.isBrowser) return;
    const id = 'knodtecone-jsonld';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(payload);
  }

  private setCanonical(url: string): void {
    if (!this.isBrowser) return;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
