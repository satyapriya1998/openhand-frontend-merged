import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `<p>Signing in...</p>`
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const session =
      this.route.snapshot.queryParamMap.get('session');

    if (!session) {

      this.router.navigate(['/auth/login']);

      return;
    }

    try {

      const decodedSession =
        JSON.parse(
          atob(
            decodeURIComponent(session)
          )
        );

      localStorage.setItem(
        'hrms_session',
        JSON.stringify(decodedSession)
      );

      this.router.navigate(['/dashboard']);

    } catch (error) {

      console.error(
        'Session restore failed:',
        error
      );

      this.router.navigate(['/auth/login']);
    }
  }
}