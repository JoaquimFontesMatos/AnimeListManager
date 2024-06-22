import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css',
})
export class BackgroundComponent implements OnInit {
  images: string[] = [
    '/assets/login.jpeg',
    '/assets/login2.jpg',
    '/assets/login3.jpg',
  ];

  currentImageIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex++;
      if (this.currentImageIndex >= this.images.length) {
        this.currentImageIndex = 0;
      }
    }, 60 * 1000); // Change image every minute
  }
}
