import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { MyServiceService } from './service/my-service.service';
import { LoaderService } from './service/loader.service';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './page/movies/movies.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    TagModule,
    CommonModule,
    CarouselModule,
    InputIconModule,
    IconFieldModule,
    ButtonModule,
    InputSwitchModule,
    InputTextModule,
    MoviesComponent,
    ProgressBarModule,
    ToolbarModule,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'moviesApp';
  searchTerm: string = '';
  test!: MoviesComponent;
  isLoading$ = this.service.isLoading$;

  constructor(
    private route: Router,
    private service: LoaderService,
  ) {}

  navigate(link: string) {
    this.route.navigate([link]);
  }
}
