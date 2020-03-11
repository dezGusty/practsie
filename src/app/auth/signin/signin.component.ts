import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: ['']
})
export class SigninComponent implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  tryGoogleLogin() {
    this.authSvc.doGoogleLogin({ successRoute: [] })
      .then(res => {
        console.log('[signin] navigating to dash');
        this.router.navigate(['/dash']);
      });
  }
}
