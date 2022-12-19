import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  imports: [FormsModule, RouterModule],
  selector: 'app-done',
  standalone: true,
  styles: [''],
  templateUrl: './done.component.html',
})
export class DoneComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
