import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-signin',
  standalone: true,
  styles: [''],
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async tryGoogleLogin() {
    await this.authSvc.doGoogleLoginAsync({ successRoute: [] })
      .then(res => {
        console.log('[signin] navigating to dash');
        this.router.navigate(['/dash']);
      });
  }
}
