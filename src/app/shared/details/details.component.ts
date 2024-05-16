import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../../service/my-service.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  data:any
  videos: any[]=[]


  constructor(private service:MyServiceService, private route: ActivatedRoute,private sanitizer: DomSanitizer){}



  ngOnInit(): void {
    this.service.getDetail(this.route.snapshot.params['id']).subscribe((details)=>{

     this.data=details;
     console.log(this.data)

    })


    this.service.getVideos(this.route.snapshot.params['id']).subscribe((videos:any)=>{


    //  this.videos= videos['results']
    
    //  this.videos= this.videos.slice(0,5)
     // console.log(this.upcomingList)
     
      
    })
  }
  

  sanitizeUrl(key: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${key}`);
  }

}
