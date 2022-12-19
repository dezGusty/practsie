import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  imports: [HeaderComponent, RouterOutlet, CommonModule, RouterModule],
  selector: 'app-root',
  standalone: true,
  styles: [''],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'practsie';
}
