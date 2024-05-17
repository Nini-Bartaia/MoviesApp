import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../service/my-service.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { RaitingComponent } from '../raiting/raiting.component';
import { ListItemComponent } from '../list-item/list-item.component';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RaitingComponent, ListItemComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  data:any
  videos: any[]=[]
  trailerDisplayed = false;
  genres:any[]=[]
  countries:any
  productions:any;
  detailGenresId = ''
  detailGenreMovies:any=[]


  constructor(private service:MyServiceService, private route: ActivatedRoute,private sanitizer: DomSanitizer){}



  ngOnInit(): void {

    this.service.getDetail(this.route.snapshot.params['id']).subscribe((details)=>{

     this.data=details;
     this.genres=details['genres']
     this.countries=details['production_countries']
     this.productions=details['production_companies']

     this.genres.forEach(item => this.detailGenresId += `${item.id},`)

     console.log(this.detailGenresId);


    })


    this.service.getVideos(this.route.snapshot.params['id']).subscribe((videos:any)=>{


    this.videos= videos['results']
    
    
    //  this.videos= this.videos.slice(0,5)
     // console.log(this.upcomingList)
     const trailers = this.videos.filter(video => video.type === 'Trailer');

     // Convert published_at strings to Date objects for trailer videos
     trailers.forEach(trailer => {
       trailer.published_at = new Date(trailer.published_at);
     });

     // Find the trailer with the maximum published_at date
     const maxDateTrailer = trailers.reduce((prev, current) => {
       return (prev.published_at > current.published_at) ? prev : current;
     });

     // Assign the maximum date trailer to the videos array
     this.videos = [maxDateTrailer];
    // console.log(this.videos)

      
    })

    this.service.getMovieWithGenres(this.detailGenresId).subscribe((details)=>{


      this.detailGenreMovies=details['results']
      console.log(this.detailGenreMovies)


   })  
   
  }
  

  sanitizeUrl(key: string) {
   // this.trailerDisplayed=true;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}`);
   
  }

}
