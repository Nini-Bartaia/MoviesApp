import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MultiSelectModule} from 'primeng/multiselect';
import { FormsModule,ReactiveFormsModule,FormControl, FormGroup, } from '@angular/forms';
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
import {CalendarModule} from 'primeng/calendar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MultiSelectModule,FormsModule,ReactiveFormsModule,AnimateModule,AnimateOnScrollModule,ScrollerModule,DragDropModule,DropdownModule,CommonModule, ListItemComponent,SliderModule, FormsModule,CalendarModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit, AfterViewInit{
  cities!: any[];

  // formGroup!: FormGroup;
  numForm!:FormGroup;
  genres$!: Observable<any>;
  movies$!:Observable<any>
  getMovieWithGenre$!:Observable<any>
  isLoading$!:any;
  rangeValues: number[] = [1700, 2024];
  rangeDates!: Date[];
  str=''
  private selectedValuesSubject = new BehaviorSubject<any[]>([]);
  // selectedValue$ = this.selectedValuesSubject.asObservable();
  startDate:string=''
  genreId:string=''
  endDate:string='' 
  newArr!:any[];
  // selectedValue$: Observable<any[]> = of([]);
  // selectedValue$: Observable<any[]> = new Observable<any[]>(observer => {
  //   observer.next([]);
  // });
  selectedValue$: Observable<any> = of();
  genresArr:any[]=[]
  updatedValue!:any;
  filterFormControl: FormControl<any | null> = new FormControl<
    any | null
  >('');
  // formGroup = new FormGroup({
  //   selectedCities: new FormControl<any[] | null>([])
  // })
 
  
 
  constructor(
    private service: MyServiceService, 
    private cdr: ChangeDetectorRef, 
    private loaderService:LoaderService, 
    private route:ActivatedRoute, 
    private router:Router
  ){}
  
  ngOnInit() {


      
    this.route.queryParams.subscribe((res)=>{
    

      if(res['with_genre']|| res['startDate'] || res['endDate']){

        this.movies$=this.service.getAllMovies( res['startDate'] , res['endDate'],res['with_genre'])
 
        this.genres$ = this.service.getGenresForMovies().pipe(
          tap((genresRes) => {
            const ids = res['with_genre'].split(',').map(Number);
            const filteredGenres = genresRes['genres'].filter((genre:any) => ids.includes(genre.id));
            filteredGenres.forEach((genre:any) => {
              if (!this.genresArr.some((existingGenre:any) => existingGenre.id === genre.id)) {
                this.genresArr.push(genre);
              }
            });
     
             this.filterFormControl.setValue(this.genresArr);
            })
        );
 



      }
      else{
        this.movies$= this.service.getAllMovies();
        this.genres$=this.service.getGenresForMovies()

      }
    })


      this.isLoading$=this.loaderService.isLoading$;

   // this.genres$=this.service.getGenresForMovies()

}

ngAfterViewInit(): void {
  this.cdr.detectChanges()
}

// appendChosenGenres() {
//   this.route.queryParams.pipe(
//     switchMap((queryParamsRes: any) => {
//       this.genres$.subscribe(res => {
//         // console.log(res)
//         const chosen = res['genres'].filter(queryParamsRes.with_genre.includes())
//         console.log(chosen)
//       })
//       return this.genres$.pipe(
//         filter(gernresRes => queryParamsRes.with_genre.includes(gernresRes.id))
//       )
//     }),
//     tap(res => console.log(res)) 
//   )
//   .subscribe(params => {
//     console.log(params);
// });
  
//   //this.filterFormControl.patchValue({});

// }
// appendChosenGenres() {
//   this.route.queryParams.pipe(
//     switchMap((queryParamsRes: any) => {
//       this.genres$.subscribe(res => {
//         // console.log(res)
//         const chosen = res['genres'].filter(queryParamsRes.with_genre?.includes);
//       })
//       return this.genres$.pipe(
//         filter(gernresRes => {
//           if (queryParamsRes.with_genre && gernresRes.id) {
//             return queryParamsRes.with_genre.includes(gernresRes.id);
//           } else {
//             return false;
//           }
//         })
//       )
//     }),
//     tap(res => console.log(res)) 
//   )
//   .subscribe(params => {
//     let str = '';
//     params.forEach((item: any) => {
//       const id = item.id;
//       if (id && !str.includes(id)) {
//         str += id + ',';
//       }
//     });
//     this.filterFormControl.patchValue({ genres: str });
//   });
// }
onGenreSelectionChange(event: any) {

 
 
  // const selectedGenreIds = event.value.map((item: any) => item.id);

  //  this.str = this.str.split(',').filter((id: string) => selectedGenreIds.includes(id)).join(',');

  //  event.value.forEach((item: any) => {
  //   if (!this.str.includes(item.id)) {
  //     this.str += (this.str.length > 0 ? ',' : '') + item.id;
  //   }
  // });

  event.value.filter((item: any) => !this.str.includes(item.id))
  .forEach((item:any)=> this.str+=item.id + ',')  //!!!!


  
  // this.selectedValue$.pipe(tap((res)=>{

  //   const selectValues=res.filter((item:any)=> !this.str.includes(res.id))
  //   selectValues.forEach((val:any)=>console.log(val) )
  // }))


   this.genreId=this.str //!!!!
    

  this.movies$=this.service.getAllMovies('','',this.str)
  this.changeQuery()


 
  //this.str=''
 }


 

    inputChange() {
     
     
      let startFormatted;
      let endFormatted;
    
      if (this.rangeDates && this.rangeDates.length > 0 ) {
        const startDate = this.rangeDates[0];
        const endDate = this.rangeDates[1];
       

        startFormatted = this.formatDate(startDate);
        this.startDate=startFormatted;

        if(endDate){
        endFormatted = this.formatDate(endDate);
        this.endDate=endFormatted
    
        
        }
       }

      

      this.movies$=this.service.getAllMovies(startFormatted, endFormatted, this.str)
      this.changeQuery()

    
    }
    
    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');  
      const day = String(date.getDate()).padStart(2, '0');
    
      return `${year}-${month}-${day}`;
    }




    changeQuery() {
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { with_genre:this.genreId, startDate:this.startDate, endDate:this.endDate}, queryParamsHandling:''});
  }
 


}