import { Component } from '@angular/core';
import { ShowJikanComponent } from '../manga/show-jikan/show-jikan.component';
import { ShowMineComponent } from '../manga/show-mine/show-mine.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [ShowJikanComponent, ShowMineComponent],
})
export class HomeComponent {}
