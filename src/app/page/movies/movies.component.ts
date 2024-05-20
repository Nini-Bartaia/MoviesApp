import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MultiSelectModule,FormsModule,ReactiveFormsModule,AnimateModule,AnimateOnScrollModule,ScrollerModule,DragDropModule,DropdownModule,CommonModule, ListItemComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit{
  cities!: any[];

  formGroup!: FormGroup;
  genres$!: Observable<any>;
  movies$!:Observable<any>
  getMovieWithGenre$!:Observable<any>


  constructor(private service: MyServiceService){}
  
  ngOnInit() {

      this.genres$= this.service.getGenresForMovies()

      this.formGroup = new FormGroup({
          selectedCities: new FormControl<any[] | null>([])
      });




     // this.formGroup.controls['selectedCities'].value[0]


  

      this.movies$= this.service.getAllMovies();


}

onGenreSelectionChange(event: any) {

 let  str=''

  event.value.forEach((item:any)=> console.log(str+=item.id +','))

  this.formGroup.controls['selectedCities'].setValue(event.value);
  this.getMovieWithGenre$= this.service.getMovieWithGenres(str)

  console.log(this.formGroup.controls['selectedCities'].value)
}

}