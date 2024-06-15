import { Component } from '@angular/core';
import { ListMangasComponent } from '../manga/list-mangas/list-mangas.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListMangasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
