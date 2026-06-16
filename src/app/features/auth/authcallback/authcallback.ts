// callback.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-callback',
template: `
  <div class="callback-page">
    <div class="background-glow glow-1"></div>
    <div class="background-glow glow-2"></div>

    <div class="callback-card">
      <!-- LEFT -->
      <div class="visual-section">
        <div class="orbital-loader">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>

          <div class="center-core">
            <div class="inner-spinner"></div>
          </div>
        </div>

        <div class="floating-badge">
          Initializing Workspace
        </div>
      </div>

      <!-- RIGHT -->
      <div class="content-section">
        <div class="mini-tag">
          Authentication Successful
        </div>

        <h1>
          We’re Setting Everything Up For You
        </h1>

        <p class="subtitle">
          Hang tight while we secure your session, load your organization,
          and prepare your dashboard experience.
        </p>

        <div class="loading-steps">
          <div class="step">
            <div class="step-dot"></div>
            <span>Securing your session</span>
          </div>

          <div class="step delay-1">
            <div class="step-dot"></div>
            <span>Loading organization data</span>
          </div>

          <div class="step delay-2">
            <div class="step-dot"></div>
            <span>Preparing your dashboard</span>
          </div>
        </div>

        <div class="progress-wrapper">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>

          <span class="progress-text">
            Almost ready...
          </span>
        </div>
      </div>
    </div>
  </div>
`,
 styles: [`
  :host {
    display: block;
    height: 100%;
  }

  .callback-page {
    position: relative;
    overflow: hidden;

    min-height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 32px;

    background:
      radial-gradient(circle at top left, rgba(59, 130, 246, 0.14), transparent 30%),
      radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.14), transparent 30%),
      linear-gradient(135deg, #020617 0%, #0f172a 45%, #111827 100%);
  }

  .background-glow {
    position: absolute;
    border-radius: 999px;
    filter: blur(100px);
    opacity: 0.5;
  }

  .glow-1 {
    width: 320px;
    height: 320px;

    top: -80px;
    left: -100px;

    background: #2563eb;
  }

  .glow-2 {
    width: 300px;
    height: 300px;

    bottom: -100px;
    right: -80px;

    background: #7c3aed;
  }

  .callback-card {
    position: relative;
    z-index: 1;

    width: 100%;
    max-width: 1200px;

    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 56px;

    align-items: center;

    padding: 48px;

    border-radius: 36px;

    background: rgba(15, 23, 42, 0.72);

    backdrop-filter: blur(24px);

    border: 1px solid rgba(255, 255, 255, 0.08);

    box-shadow:
      0 25px 80px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  .visual-section {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .orbital-loader {
    position: relative;

    width: 320px;
    height: 320px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ring {
    position: absolute;

    border-radius: 50%;

    border-style: solid;
    border-color: transparent;
  }

  .ring-1 {
    width: 320px;
    height: 320px;

    border-width: 3px;
    border-top-color: #60a5fa;

    animation: rotate 8s linear infinite;
  }

  .ring-2 {
    width: 240px;
    height: 240px;

    border-width: 3px;
    border-bottom-color: #8b5cf6;

    animation: rotateReverse 6s linear infinite;
  }

  .ring-3 {
    width: 160px;
    height: 160px;

    border-width: 3px;
    border-left-color: #38bdf8;

    animation: rotate 4s linear infinite;
  }

  .center-core {
    width: 110px;
    height: 110px;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background:
      linear-gradient(135deg, #1e293b, #0f172a);

    border: 1px solid rgba(255, 255, 255, 0.08);

    box-shadow:
      0 0 40px rgba(96, 165, 250, 0.2);
  }

  .inner-spinner {
    width: 54px;
    height: 54px;

    border-radius: 50%;

    border: 4px solid rgba(255, 255, 255, 0.08);
    border-top-color: #60a5fa;

    animation: rotate 1s linear infinite;
  }

  .floating-badge {
    margin-top: 28px;

    padding: 12px 18px;

    border-radius: 999px;

    background: rgba(255, 255, 255, 0.05);

    border: 1px solid rgba(255, 255, 255, 0.08);

    color: #cbd5e1;

    font-size: 0.95rem;
    font-weight: 500;

    letter-spacing: 0.02em;
  }

  .content-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .mini-tag {
    width: fit-content;

    margin-bottom: 18px;

    padding: 8px 14px;

    border-radius: 999px;

    background: rgba(59, 130, 246, 0.12);

    border: 1px solid rgba(96, 165, 250, 0.2);

    color: #93c5fd;

    font-size: 0.82rem;
    font-weight: 600;

    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  h1 {
    margin: 0;

    color: #f8fafc;

    font-size: 3.2rem;
    line-height: 1.1;
    font-weight: 800;

    letter-spacing: -0.04em;

    max-width: 680px;
  }

  .subtitle {
    margin:
      24px 0
      36px;

    max-width: 640px;

    color: #94a3b8;

    font-size: 1.1rem;
    line-height: 1.8;
  }

  .loading-steps {
    display: flex;
    flex-direction: column;
    gap: 18px;

    margin-bottom: 36px;
  }

  .step {
    display: flex;
    align-items: center;
    gap: 14px;

    padding: 16px 18px;

    border-radius: 18px;

    background: rgba(255, 255, 255, 0.04);

    border: 1px solid rgba(255, 255, 255, 0.05);

    opacity: 0;

    transform: translateY(10px);

    animation: fadeUp 0.6s ease forwards;
  }

  .delay-1 {
    animation-delay: 0.25s;
  }

  .delay-2 {
    animation-delay: 0.5s;
  }

  .step-dot {
    position: relative;

    width: 12px;
    height: 12px;

    border-radius: 50%;

    background: #60a5fa;

    flex-shrink: 0;
  }

  .step-dot::after {
    content: '';

    position: absolute;
    inset: -6px;

    border-radius: 50%;

    border: 1px solid rgba(96, 165, 250, 0.5);

    animation: pulse 2s infinite;
  }

  .step span {
    color: #e2e8f0;

    font-size: 1rem;
    font-weight: 500;
  }

  .progress-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .progress-bar {
    width: 100%;
    height: 12px;

    overflow: hidden;

    border-radius: 999px;

    background: rgba(255, 255, 255, 0.06);
  }

  .progress-fill {
    width: 35%;
    height: 100%;

    border-radius: inherit;

    background:
      linear-gradient(
        90deg,
        #3b82f6,
        #8b5cf6
      );

    animation: loading 2s ease-in-out infinite;
  }

  .progress-text {
    color: #64748b;

    font-size: 0.92rem;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes rotateReverse {
    from {
      transform: rotate(360deg);
    }

    to {
      transform: rotate(0deg);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 1;
    }

    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(320%);
    }
  }

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 980px) {
    .callback-card {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .content-section {
      align-items: center;
    }

    .loading-steps {
      width: 100%;
    }

    h1 {
      font-size: 2.4rem;
    }
  }

  @media (max-width: 640px) {
    .callback-page {
      padding: 20px;
    }

    .callback-card {
      padding: 32px 24px;
      gap: 32px;
    }

    .orbital-loader {
      width: 240px;
      height: 240px;
    }

    .ring-1 {
      width: 240px;
      height: 240px;
    }

    .ring-2 {
      width: 180px;
      height: 180px;
    }

    .ring-3 {
      width: 120px;
      height: 120px;
    }

    h1 {
      font-size: 2rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }
`]
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (this.authService.authenticated()) {
        this.router.navigate(['/dashboard']);
      } else {
        console.error('Failed to load session');
        this.router.navigate(['/auth/login']);
      }
    }, 3000);
  }
}