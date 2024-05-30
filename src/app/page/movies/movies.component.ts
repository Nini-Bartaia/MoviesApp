import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { AnimateModule } from 'primeng/animate';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ScrollerModule } from 'primeng/scroller';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { BehaviorSubject, Observable, filter, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MyServiceService } from '../../service/my-service.service';
import { ListItemComponent } from '../../shared/list-item/list-item.component';
import { LoaderService } from '../../service/loader.service';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { ActivatedRoute, Router } from '@angular/router';
import { changeQuery } from '../../shared/models/query';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AnimateModule,
    AnimateOnScrollModule,
    ScrollerModule,
    DragDropModule,
    DropdownModule,
    CommonModule,
    ListItemComponent,
    SliderModule,
    FormsModule,
    CalendarModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit, AfterViewInit {
  cities!: any[];
  numForm!: FormGroup;
  genres$!: Observable<any>;
  movies$!: Observable<any>;
  getMovieWithGenre$!: Observable<any>;
  isLoading$!: any;
  rangeValues: number[] = [1700, 2024];
  rangeDates!: Date[];
  str = '';
  startDate: string = '';
  genreId: string = '';
  endDate: string = '';
  newArr!: any[];
  selectedValue$: Observable<any> = of();
  genresArr: any[] = [];
  updatedValue!: any;
  filterFormControl: FormControl<any | null> = new FormControl<any | null>('');

  constructor(
    private service: MyServiceService,
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.maintainState();

    this.isLoading$ = this.loaderService.isLoading$;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onGenreSelectionChange(event: any) {
    this.str = '';
    event.value.forEach((item: any) => (this.str += item.id + ','));
    this.movies$ = this.service.getAllMovies('', '', this.str);
    this.changeQuery();
  }

  maintainState() {
    this.route.queryParams.subscribe((res) => {
      if (res['with_genre'] || res['startDate'] || res['endDate']) {
        this.movies$ = this.service.getAllMovies(
          res['startDate'],
          res['endDate'],
          res['with_genre'],
        );

        this.genres$ = this.service.getGenresForMovies().pipe(
          tap((genresRes) => {
            const ids = res['with_genre'].split(',').map(Number);
            const filteredGenres = genresRes['genres'].filter((genre: any) =>
              ids.includes(genre.id),
            );
            this.genresArr = [];
            filteredGenres.forEach((genre: any) => {
              if (
                !this.genresArr.some(
                  (existingGenre: any) => existingGenre.id === genre.id,
                )
              ) {
                this.genresArr.push(genre);
              }
            });

            this.filterFormControl.setValue(this.genresArr);
          }),
        );
      } else {
        this.movies$ = this.service.getAllMovies();
        this.genres$ = this.service.getGenresForMovies();
      }
    });
  }

  inputChange() {
    let startFormatted;
    let endFormatted;

    if (this.rangeDates && this.rangeDates.length > 0) {
      const startDate = this.rangeDates[0];
      const endDate = this.rangeDates[1];

      startFormatted = this.formatDate(startDate);
      this.startDate = startFormatted;

      if (endDate) {
        endFormatted = this.formatDate(endDate);
        this.endDate = endFormatted;
      }
    }

    this.movies$ = this.service.getAllMovies(
      startFormatted,
      endFormatted,
      this.str,
    );
    this.changeQuery();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  changeQuery() {
    changeQuery(
      this.router,
      this.route,
      this.str,
      this.startDate,
      this.endDate,
    );
  }
}
