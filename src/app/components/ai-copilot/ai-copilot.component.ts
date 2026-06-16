import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import { LocaleService } from '../../services/locale.service';

interface Cap {
  icon: string;
  text: string;
}

const CAPS: Cap[] = [
  { icon: 'fa-user-plus', text: 'Automated employee onboarding' },
  { icon: 'fa-umbrella-beach', text: 'Leave policy assistance' },
  { icon: 'fa-book', text: 'Centralized HR knowledge base' },
  { icon: 'fa-calendar-check', text: 'Attendance & shift insights' },
  { icon: 'fa-wallet', text: 'Payroll queries & summaries' },
  { icon: 'fa-chart-line', text: 'Performance recommendations' },
  { icon: 'fa-bullseye', text: 'Goal & OKR coaching' },
  { icon: 'fa-globe', text: 'Multi-language support' },
];

const ANSWERS: Record<string, string> = {
  'How many people are on leave today?':
    '34 employees are on leave today — 12 on paid leave, 8 sick, and 14 on planned vacation across 6 departments.',
  'Summarize Q3 attrition':
    'Q3 attrition is 4.2%, down from 5.8% last quarter. Engineering improved the most (-2.1%).',
  'Who joins next week?':
    '7 new hires onboard next week. Welcome kits and training plans are auto-assigned and ready.',
  'Generate onboarding for new designer':
    'Created onboarding for "Riya P." — day-1 welcome email, Figma + Slack access, design system tour, and 30/60/90 plan generated.',
  'Show this month\'s payroll cost':
    'This month\'s payroll cost: $1.42M across 2,847 employees. Variance vs. last month: +1.8% (5 new hires).',
  'Top performers this quarter':
    'Top 5 performers: Ananya S., Marcus R., Priya N., Daniel O., Elena W. — all in Engineering & Design.',
};

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  thinking?: boolean;
}

@Component({
  selector: 'app-ai-copilot',
  standalone: true,
  imports: [RevealDirective, SpotlightDirective],
  templateUrl: './ai-copilot.component.html',
  styleUrl: './ai-copilot.component.scss',
})
export class AiCopilotComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly locale = inject(LocaleService);

  readonly capabilities = CAPS;
  readonly suggestions = Object.keys(ANSWERS);
  readonly typingPhrases = [
    'Analyzing workforce data…',
    'Composing your answer…',
    'Pulling from HR knowledge base…',
  ];

  readonly messages = signal<ChatMessage[]>([
    { role: 'bot', text: 'Hi! I am your HR Copilot. Ask me anything about your workforce.' },
  ]);

  ask(question: string): void {
    this.messages.update((msgs) => [...msgs, { role: 'user', text: question }]);
    // Show "thinking" state
    setTimeout(() => {
      this.messages.update((msgs) => [...msgs, { role: 'bot', thinking: true, text: '' }]);
      // Then give answer
      setTimeout(() => {
        this.messages.update((msgs) => {
          const copy = [...msgs];
          const idx = copy.findIndex((m) => m.thinking);
          if (idx >= 0) copy[idx] = { role: 'bot', text: ANSWERS[question] ?? 'Let me pull that from your HR data…' };
          return copy;
        });
      }, 900);
    }, 200);
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
