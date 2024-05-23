import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { LoaderService } from '../../service/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [MultiSelectModule,FormsModule,ReactiveFormsModule,AnimateModule,AnimateOnScrollModule,ScrollerModule,DragDropModule,DropdownModule,CommonModule, ListItemComponent,SliderModule, 
    FormsModule,CalendarModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.scss'
})
export class SeriesComponent implements OnInit {



  isLoading$!:any;
  series$!: Observable<any>;
  seriesGenres$!:Observable<any>;
  str='';
  genreIds:string=''


constructor(private service: MyServiceService, 
  private cdr: ChangeDetectorRef, 
  private loaderService:LoaderService){}



ngOnInit(): void {
  

  this.series$=this.service.getSeries()
  this.seriesGenres$= this.service.getSeriesGenres()
  // this.isLoading$=this.loaderService.isLoading$;

 
}

onGenreSelectionChange(event: any) {
 
  
  event.value.filter((item: any) => !this.str.includes(item.id))
  .forEach((item:any)=> this.str+=item.id + ',');

  this.genreIds=this.str
  

  // this.movies$=this.service.getAllMovies('','',this.str)
  // this.changeQuery()

  //this.str=''
 }


}
