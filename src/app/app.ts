import { Component, HostListener, OnDestroy, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  /** Current scroll position 0..1, used by the gradient scroll progress bar. */
  readonly scrollProgress = signal(0);
  
  /** Whether the user is currently dragging the progress indicator */
  isDragging = signal(false);
  
  /** Whether to show the percentage tooltip */
  showTooltip = signal(false);
  
  private lastScrollTime = 0;
  private readonly scrollThrottle = 16; // ~60fps
  
  /** Store initial X position when starting drag */
  private dragStartX = 0;
  private dragStartScrollY = 0;
  
  /** Bound event handlers for proper removal */
  private boundMouseMove = this.onMouseMove.bind(this);
  private boundMouseUp = this.onMouseUp.bind(this);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.onScroll(), 50);
    }
  }

  ngOnDestroy(): void {
    this.removeDragListeners();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Skip throttle check during drag operations
    if (this.isDragging()) return;
    
    // Throttle scroll events for better performance
    const now = performance.now();
    if (now - this.lastScrollTime < this.scrollThrottle) {
      return;
    }
    this.lastScrollTime = now;
    
    const doc = document.documentElement;
    const scrollHeight = doc.scrollHeight;
    const clientHeight = doc.clientHeight;
    const scrollableHeight = scrollHeight - clientHeight;
    
    // Ensure progress reaches 1 when scrolled to bottom
    if (scrollableHeight <= 0) {
      this.scrollProgress.set(1);
      return;
    }
    
    const progress = Math.min(1, Math.max(0, window.scrollY / scrollableHeight));
    this.scrollProgress.set(progress);
  }

  /** Start drag operation when user mouses down on the progress indicator */
  onDragStart(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.isDragging.set(true);
    this.showTooltip.set(true);
    this.dragStartX = event.clientX;
    this.dragStartScrollY = window.scrollY;
    
    // Add event listeners for drag
    document.addEventListener('mousemove', this.boundMouseMove);
    document.addEventListener('mouseup', this.boundMouseUp);
    
    // Prevent text selection during drag
    event.preventDefault();
  }

  /** Handle mouse move during drag */
  private onMouseMove(event: MouseEvent): void {
    if (!this.isDragging() || !isPlatformBrowser(this.platformId)) return;
    
    const doc = document.documentElement;
    const scrollableHeight = doc.scrollHeight - doc.clientHeight;
    
    if (scrollableHeight <= 0) return;
    
    // Calculate the movement delta
    const deltaX = event.clientX - this.dragStartX;
    const viewportWidth = window.innerWidth;
    
    // Convert horizontal movement to scroll progress
    const progressDelta = deltaX / viewportWidth;
    let newProgress = (this.dragStartScrollY / scrollableHeight) + progressDelta;
    
    // Clamp progress between 0 and 1
    newProgress = Math.min(1, Math.max(0, newProgress));
    
    // Calculate new scroll position
    const newScrollY = newProgress * scrollableHeight;
    
    // Update scroll position
    window.scrollTo({
      top: newScrollY,
      behavior: 'instant'
    });
    
    this.scrollProgress.set(newProgress);
  }

  /** Handle mouse up to end drag */
  private onMouseUp(): void {
    this.isDragging.set(false);
    
    // Keep tooltip visible briefly after drag ends
    setTimeout(() => {
      if (!this.isDragging()) {
        this.showTooltip.set(false);
      }
    }, 500);
    
    this.removeDragListeners();
  }

  /** Remove drag event listeners */
  private removeDragListeners(): void {
    document.removeEventListener('mousemove', this.boundMouseMove);
    document.removeEventListener('mouseup', this.boundMouseUp);
  }

  /** Show tooltip on hover */
  onMouseEnter(): void {
    this.showTooltip.set(true);
  }

  /** Hide tooltip on leave */
  onMouseLeave(): void {
    if (!this.isDragging()) {
      this.showTooltip.set(false);
    }
  }

  /** Get formatted percentage string */
  get scrollPercentage(): number {
    return Math.round(this.scrollProgress() * 100);
  }
}
