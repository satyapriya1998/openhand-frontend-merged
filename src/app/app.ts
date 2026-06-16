import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  // templateUrl: './app.html',
  template: `
    <router-outlet></router-outlet>
   
  `,
  styleUrl: './app.scss'
})
export class AppComponent {
  
}
