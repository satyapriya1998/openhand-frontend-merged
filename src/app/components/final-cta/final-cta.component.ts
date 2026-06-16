import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  imports: [RouterModule, RevealDirective],
  templateUrl: './final-cta.component.html',
  styleUrl: './final-cta.component.scss',
})
export class FinalCtaComponent {}
