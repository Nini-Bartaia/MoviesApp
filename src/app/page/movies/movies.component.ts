import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MultiSelectModule} from 'primeng/multiselect';
import { FormsModule,ReactiveFormsModule,FormControl, FormGroup, } from '@angular/forms';
import { AnimateModule } from 'primeng/animate';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ScrollerModule } from 'primeng/scroller';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MyServiceService } from '../../service/my-service.service';
import { ListItemComponent } from '../../shared/list-item/list-item.component';
import { LoaderService } from '../../service/loader.service';
import { SliderModule } from 'primeng/slider';
import {CalendarModule} from 'primeng/calendar';
import { ActivatedRoute, Router } from '@angular/router';
import { start } from 'repl';

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
  startDate:string=''
  genreId:string=''
  endDate:string=''
  selectedValue!:any;
  updatedValue!:any;
  filterFormControl: FormControl<any | null> = new FormControl<
    any | null
  >('');
  // formGroup = new FormGroup({
  //   selectedCities: new FormControl<any[] | null>([])
  // })
 
  
 
  constructor(private service: MyServiceService, private cdr: ChangeDetectorRef, private loaderService:LoaderService, private route:ActivatedRoute, private router:Router){}
  
  ngOnInit() {


    this.route.queryParams.subscribe((res)=>{
      console.log(res['with_genre'])

      if(res['with_genre']|| res['startDate'] || res['endDate']){

        this.movies$=this.service.getAllMovies( res['startDate'] , res['endDate'],res['with_genre'])
        // console.log( this.formGroup.controls['selectedCities'])
        
        //  console.log(this.filterFormControl.value)

        //  this.filterFormControl.setValue(this.selectedValue)

        //  this.filterFormControl.value.forEach((item:any)=> this.updatedValue=item.name) 
         

        
        

      }
      // else if(res['with_genre']==' '){

      //   // this.selectedValue.forEach((item:any)=> this.updatedValue=item.name) 

      //   console.log(this.filterFormControl)
      //        }

      else{
        this.movies$= this.service.getAllMovies();

      }
    })

      this.genres$= this.service.getGenresForMovies()


    //   this.numForm = new FormGroup({
    //     inputNum: new FormControl<number[] | null>([])
    // });


 

      this.isLoading$=this.loaderService.isLoading$;


    //  this.movies$= this.service.getAllMovies();
  
  
    this.genres$.subscribe((res)=>{

      this.selectedValue=res['genres'][0].name
      console.log(res['genres'][0].name)
    })

}

ngAfterViewInit(): void {
  this.cdr.detectChanges()
}

onGenreSelectionChange(event: any) {

  // this.selectedValue=event.value
  
  event.value.forEach((item:any)=> console.log(this.str+=item.id +','))
  event.value.forEach((item:any)=> this.selectedValue=item.name)

  this.genreId=this.str


 // this.formGroup.controls['selectedCities'].setValue(event.value);
  // this.getMovieWithGenre$= this.service.getMovieWithGenres(str)
  //this.movies$=this.service.getMovieWithGenres(str);

  this.movies$=this.service.getAllMovies('','',this.str)
  this.changeQuery()

  //this.str=''
 }



    // numberChange(event:any){

    //   console.log(event.values)

    // }


    // inputChange(event:any){


    //   console.log(event)

    // }

    inputChange() {
      // console.log(event)
      // let startFormatted;
      // let endFormatted;
     
      // if (event) {
      //   let startDate = event;
      //   let endDate = event;
    
      //    startFormatted = this.formatDate(startDate);
      //  let start=startFormatted
      //    endFormatted = this.formatDate(endDate);
      // let end=endFormatted
    
      //   console.log(startFormatted);
      //   console.log(endFormatted)
     
      // }
 
     
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
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { with_genre:this.genreId, startDate:this.startDate, endDate:this.endDate}});
  }

  // customDisplayValueTemplate(item: any) {
  //   return item.name ;
  // }


}