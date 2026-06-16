import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
  TemplateRef,
  ViewChildren,
  ElementRef,
  QueryList as ViewQueryList,
  AfterViewInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Tab {
  id: string;
  label: string;
  icon?: IconDefinition;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.scss'],
})
export class TabsComponent implements AfterContentInit, AfterViewInit {
  @Input() tabs: Tab[] = [];

  @Input() activeTab = '';

  @Output() tabChange = new EventEmitter<string>();

  @ContentChildren(TemplateRef)
  templates!: QueryList<TemplateRef<any>>;

  @ViewChildren('tabButton')
  tabButtons!: ViewQueryList<ElementRef<HTMLButtonElement>>;

  indicatorWidth = 0;

  indicatorLeft = 0;

  ngAfterContentInit(): void {
    if (!this.activeTab && this.tabs.length > 0) {
      this.activeTab = this.tabs[0].id;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateIndicator();
    });
  }

  selectTab(tab: Tab): void {
    if (tab.disabled) return;

    this.activeTab = tab.id;

    this.updateIndicator();

    this.tabChange.emit(tab.id);
  }

  private updateIndicator(): void {
    const activeIndex = this.tabs.findIndex((t) => t.id === this.activeTab);

    const activeButton = this.tabButtons.get(activeIndex);

    if (!activeButton) return;

    const el = activeButton.nativeElement;

    this.indicatorWidth = el.offsetWidth;

    this.indicatorLeft = el.offsetLeft;
  }
}
