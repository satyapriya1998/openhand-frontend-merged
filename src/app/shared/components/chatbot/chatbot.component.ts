import { Component, signal, computed, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <!-- Chat Window -->
      <div 
        *ngIf="isOpen()"
        class="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right"
        style="height: 500px; max-height: calc(100vh - 120px);"
      >
        <!-- Header -->
        <div class="bg-primary-600 px-4 py-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-medium text-sm">HR Assistant</h3>
              <p class="text-primary-100 text-xs">Online</p>
            </div>
          </div>
          <button (click)="toggle()" class="text-white/80 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div #messageContainer class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          <div *ngFor="let msg of messages()" class="flex" [ngClass]="msg.sender === 'user' ? 'justify-end' : 'justify-start'">
            <div 
              class="max-w-[80%] rounded-2xl px-4 py-2 text-sm"
              [ngClass]="msg.sender === 'user' 
                ? 'bg-primary-600 text-white rounded-br-none' 
                : 'bg-white text-gray-800 shadow-sm rounded-bl-none border border-gray-100'"
            >
              <p>{{ msg.text }}</p>
              <span class="text-xs opacity-70 mt-1 block" [ngClass]="msg.sender === 'user' ? 'text-primary-100' : 'text-gray-400'">
                {{ msg.timestamp | date:'shortTime' }}
              </span>
            </div>
          </div>
          <div *ngIf="isTyping()" class="flex justify-start">
            <div class="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-100">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="p-3 bg-white border-t border-gray-200">
          <form (submit)="sendMessage(); $event.preventDefault()" class="flex gap-2">
            <input
              type="text"
              [(ngModel)]="newMessage"
              name="message"
              placeholder="Type a message..."
              class="flex-1 rounded-full border-gray-300 focus:border-primary-500 focus:ring-primary-500 text-sm px-4 py-2"
            />
            <button 
              type="submit"
              [disabled]="!newMessage.trim()"
              class="bg-primary-600 text-white rounded-full p-2 hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <!-- Floating Button -->
      <button
        (click)="toggle()"
        class="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        <svg *ngIf="!isOpen()" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
        <svg *ngIf="isOpen()" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
    </div>
  `
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  isOpen = signal(false);
  messages = signal<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I am your HR assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  newMessage = '';
  isTyping = signal(false);

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  sendMessage(): void {
    const text = this.newMessage.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.update(msgs => [...msgs, userMsg]);
    this.newMessage = '';
    this.isTyping.set(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        'I understand. Let me help you with that.',
        'You can find that information in the Leave module.',
        'Please contact your HR manager for further assistance.',
        'I have noted your request. Is there anything else?',
        'You can apply for leave through the Apply Leave tab.'
      ];
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      };
      this.messages.update(msgs => [...msgs, botMsg]);
      this.isTyping.set(false);
    }, 1500);
  }

  ngAfterViewChecked(): void {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }
  }
}
