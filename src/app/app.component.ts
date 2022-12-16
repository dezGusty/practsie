import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  imports: [HeaderComponent, RouterOutlet],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent {
  title = 'practsie';
}
