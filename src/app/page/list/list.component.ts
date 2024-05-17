import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
// import { Input } from '@angular/core';
import { ListItemComponent } from '../../shared/list-item/list-item.component';
import { GalleriaModule } from 'primeng/galleria';
// import { SafePipe } from '../../shared/safe.pipe';
// import { SafePipe } from 'safe-pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { RaitingComponent } from '../../shared/raiting/raiting.component';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ToolbarModule,InputTextModule,InputSwitchModule,ButtonModule,IconFieldModule,InputIconModule,CarouselModule,TagModule,ListItemComponent,GalleriaModule,RaitingComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{


 // itemArray$!:Observable<any>;
  responsiveOptions: any[] | undefined;
  movies: any;
  trendingMovies!:any[];
  headerList: any[]=[];
  arr: any[]=[]
  seriesArr:any[]=[]
  upcomingList:any[]=[]
  videos: any[]=[]
  // safe!:SafePipe

  // url:string='www.youtube.com/watch?v='
  
  

  responsiveOptionsHeader: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
 

  constructor(private service: MyServiceService, private sanitizer: DomSanitizer){

   
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


this.service.getOnAirSeries().subscribe((series:any)=>{
    this.seriesArr= series['results']

    this.seriesArr= this.seriesArr.slice(0,5);

})

this.service.getHeaderList().subscribe((list:any)=>{


  this.headerList= list['results']

  this.headerList= this.headerList.slice(0,5)
 // console.log(this.headerList)
  
})

this.service.getUpcomingList().subscribe((list:any)=>{


  this.upcomingList= list['results']

  this.upcomingList= this.upcomingList.slice(0,5)
 // console.log(this.upcomingList)
  
})

// this.service.getVideos().subscribe((videos:any)=>{


//   this.videos= videos['results']

//   this.videos= this.videos.slice(0,5)
//  // console.log(this.upcomingList)
 
  
// })
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



  sanitizeUrl(key: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}`);
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



// safeUrl(key:string){

  
//   return this.safe?.transform('www.youtube.com/watch?v='+ key)

// }

// getStarRating(vote_average: number): number {
//   return Math.round(vote_average / 2);
// }

}


