import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TagModule,
    CarouselModule,
    InputIconModule,
    IconFieldModule,
    ButtonModule,
    InputSwitchModule,
    InputTextModule,
    ToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'moviesApp';

  constructor(private route: Router) {}

  navigateHome() {
    this.route.navigate(['/list']);
  }
}
