import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../service/my-service.service';
import { Observable, map } from 'rxjs';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ToolbarModule,InputTextModule,InputSwitchModule,ButtonModule,IconFieldModule,InputIconModule,CarouselModule,TagModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{

 // itemArray$!:Observable<any>;
  responsiveOptions: any[] | undefined;
  movies: any;
  trendingMovies!:any[];

  arr: any[]=[]
 

  constructor(private service: MyServiceService){

   
  }

  ngOnInit(): void {
  //  this.itemArray$ = this.service.getMoviesList()
  //  this.itemArray$.subscribe((res)=> console.log(res))

  // this.itemArray$= this.service.getMoviesList().pipe(
  //   map((movies: any[]) => movies.slice(0, 5))
  // )
  // this.service.getMoviesList().pipe(map((movies: any[])=> movies.slice(0,5))).subscribe(res=>{console.log(res)})

  this.service.getMoviesList().subscribe((movie: any) => {
    this.movies = movie['results'];

    // console.log(this.movies['results'])
});

this.service.getLatest().subscribe((movies:any)=>{
  this.arr=movies['results']
  //console.log(this.arr.slice(0,5))
  this.trendingMovies=this.arr.slice(0,5);
  //console.log(this.trendingMovies)
  //console.log(this.trendingMovies['results'])
})


  this.responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
]
  }


//   getSeverity(status: string) {
//     switch (status) {
//         case 'INSTOCK':
//             return 'success';
//         case 'LOWSTOCK':
//             return 'warning';
//         case 'OUTOFSTOCK':
//             return 'danger';
//     }
// }

}
function slice(arg0: number, arg1: number): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

