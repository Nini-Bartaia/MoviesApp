import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../service/my-service.service';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ListItemComponent } from '../../shared/list-item/list-item.component';
import { GalleriaModule } from 'primeng/galleria';
import { DomSanitizer } from '@angular/platform-browser';
import { RaitingComponent } from '../../shared/raiting/raiting.component';
import {
  responsiveOptionsConst,
  responsiveOptionsHeaderConst,
} from '../../shared/models/consts';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ToolbarModule,
    InputTextModule,
    InputSwitchModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    CarouselModule,
    TagModule,
    ListItemComponent,
    GalleriaModule,
    RaitingComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  responsiveOptions: any[] | undefined = responsiveOptionsConst; //გავიტანე ცალკე კონსტებში ზედმეტ ადგილს არ დაიკავებს ტს ფაილში
  movies$!: Observable<any>;
  trendingMovies$!: Observable<any>;
  headerList$!: Observable<any>; // გადავაწყვე ობზერველბებად და ჩტმელში გამოვიყენე async pipe
  arr$!: Observable<any>;
  seriesArr$!: Observable<any>;
  upcomingList$!: Observable<any>;

  responsiveOptionsHeader: any[] = responsiveOptionsHeaderConst; //გავიტანე კონსტანტებში

  constructor(
    private service: MyServiceService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.movies$ = this.service.getMoviesList();
    this.trendingMovies$ = this.service.getLatest();
    this.seriesArr$ = this.service.getOnAirSeries(); // აღარ გვჭირდება დასაბსქრაიბება ვიყენებთ async pipe
    this.headerList$ = this.service.getHeaderList();
    this.upcomingList$ = this.service.getUpcomingList();
  }

  onClick(id: any) {
    this.router.navigate(['details', id]);
  }

  sanitizeUrl(key: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${key}`,
    );
  }

  navigateMovies() {
    this.router.navigate(['movies']);
  }
}
