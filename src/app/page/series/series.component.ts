import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimateModule } from 'primeng/animate';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ScrollerModule } from 'primeng/scroller';
import { ListItemComponent } from '../../shared/list-item/list-item.component';
import { SliderModule } from 'primeng/slider';
import { CalendarModule } from 'primeng/calendar';
import { MyServiceService } from '../../service/my-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../service/loader.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-series',
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
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss',
})
export class SeriesComponent implements OnInit {
  isLoading$!: any;
  series$!: Observable<any>;
  seriesGenres$!: Observable<any>;
  str = '';
  genreIds: string = '';
  rangeDates!: Date[];
  filterFormControl: FormControl<any | null> = new FormControl<any | null>('');
  genresArr: any[] = [];
  startDate: string = '';
  endDate: string = '';
  constructor(
    private service: MyServiceService,
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.series$ = this.service.getSeries();
    this.seriesGenres$ = this.service.getSeriesGenres();

    // this.isLoading$=this.loaderService.isLoading$;

    this.route.queryParams.subscribe((queryParamsRes) => {
      if (
        queryParamsRes['with_genre'] ||
        queryParamsRes['startDate'] ||
        queryParamsRes['endDate']
      ) {
        this.series$ = this.service.getAllSeries(
          queryParamsRes['startDate'],
          queryParamsRes['endDate'],
          queryParamsRes['with_genre'],
        );

        this.seriesGenres$.pipe(
          tap((genresRes) => {
            const ids = genresRes['with_genre'].split(',').map(Number);
            const filteredIds = genresRes['genres'].filter((val: any) =>
              ids.includes(val.id),
            );
            this.genresArr = [];

            filteredIds.forEach((genre: any) => {
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
        this.series$ = this.service.getAllSeries();
      }
    });
  }

  onGenreSelectionChange(event: any) {
    this.str = '';
    event.value.forEach((item: any) => (this.str += item.id + ','));

    this.series$ = this.service.getAllSeries('', '', this.str);

    this.changeQuery();
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

    this.series$ = this.service.getAllMovies(
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
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {
        with_genre: this.str,
        startDate: this.startDate,
        endDate: this.endDate,
      },
    });
  }
}
