import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../service/my-service.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { RaitingComponent } from '../raiting/raiting.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RaitingComponent, ListItemComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  data: any;
  videos$!: Observable<any>;
  detailGenreMovies$!: Observable<any>;
  trailerDisplayed = false;
  genres: any[] = [];
  countries: any;
  productions: any;
  detailGenresId = '';

  constructor(
    private service: MyServiceService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.getInfo();
    this.videos$ = this.service.getVideos(this.route.snapshot.params['id']);

    this.detailGenreMovies$ = this.service.getMovieWithGenres(
      this.detailGenresId,
    );
  }

  getInfo() {
    this.service
      .getDetail(this.route.snapshot.params['id'])
      .subscribe((details) => {
        this.data = details;
        this.genres = details['genres'];
        this.countries = details['production_countries'];
        this.productions = details['production_companies'];
        this.genres.forEach((item) => (this.detailGenresId += `${item.id},`));
      });
  }

  sanitizeUrl(key: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${key}`,
    );
  }
}
