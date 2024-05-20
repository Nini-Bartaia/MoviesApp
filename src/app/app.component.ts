import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    TagModule,CommonModule,
    CarouselModule,
    InputIconModule,
    IconFieldModule,
    ButtonModule,
    InputSwitchModule,
    InputTextModule,
    ProgressBarModule,
    ToolbarModule  ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'moviesApp';

  constructor(private route: Router, private service: LoaderService, private cdr: ChangeDetectorRef) {}

  
  ngAfterViewInit(): void {
    this.cdr.detectChanges()


  }

  isLoading$= this.service.isLoading$;

  ngOnInit(): void {
   // this.service.loader.subscribe((res)=>this.isLoading=res)

   this.service.isLoading$.subscribe((res)=>console.log(res))

  }

  
  navigateHome() {
    this.route.navigate(['/list']);
  }

  navigateMovies(){
    this.route.navigate(['/movies']);
  }
}
