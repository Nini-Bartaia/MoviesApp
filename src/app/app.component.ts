import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
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
export class AppComponent implements OnInit, AfterViewInit {
  title = 'moviesApp';
  searchTerm: string = '';

  constructor(
    private route: Router,
    private service: LoaderService,
    private cdr: ChangeDetectorRef,
    private myService: MyServiceService,
  ) {}

  test!: MoviesComponent;

  ngAfterViewInit(): void {
    // this.cdr.detectChanges()
  }

  isLoading$ = this.service.isLoading$;

  ngOnInit(): void {
    // this.service.loader.subscribe((res)=>this.isLoading=res)
  }

  navigateHome() {
    this.route.navigate(['/list']);
  }

  navigateMovies() {
    this.route.navigate(['movies'], {
      queryParams: { with_genre: '', startDate: '', endDate: '' },
    });
  }

  navigateSeries() {
    this.route.navigate(['series'], {
      queryParams: { with_genre: '', startDate: '', endDate: '' },
    });
  }

  navigateCollection() {
    this.route.navigate(['collection']);
  }

  // onInputChange(event: any) {
  //   console.log(event.target.value);

  //   this.myService.searchMovie(event.target.value);
  // }

  // onEnterPressed(event: any) {
  //   console.log(event.target.value);
  //   this.searchTerm = event.target.value;
  //   this.myService.searchMovie(this.searchTerm);
  // }
}
