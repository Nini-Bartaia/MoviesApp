import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../service/my-service.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { RaitingComponent } from '../raiting/raiting.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { Observable, map, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../safe.pipe';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RaitingComponent, ListItemComponent, SafePipe],
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

    this.detailGenreMovies$ = this.service.getMovieWithGenres(
      this.detailGenresId,
    );
    
  }

  getInfo() {
    this.route.params.pipe(map(params=> params['id'])).pipe(switchMap(id =>  this.service
      .getDetail(id).pipe(switchMap((details) => of({details, id}))) ))
     
      .subscribe(({details, id}) => {
        console.log(details)
        this.data = details;
        this.genres = details['genres'];
        this.countries = details['production_countries'];
        this.productions = details['production_companies'];
        this.videos$ = this.service.getVideos(id);
        this.videos$.subscribe(res => console.log(res, 'respose'))
        this.genres.forEach((item) => (this.detailGenresId += `${item.id},`));
        // this.videos$.subscribe((res) => console.log(res, 'response dete'))
      });

    }
   
  

  // sanitizeUrl(key: string) {
  //   // console.log('dgdgdhdhd')
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `https://www.youtube.com/embed/${key}`,
  //   );
  // }

}
