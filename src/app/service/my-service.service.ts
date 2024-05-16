import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, exhaustMap, switchMap } from 'rxjs';
import { env } from '../../environments/env';

import { headers } from '../../types/headerType';
@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  getList$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  getLatest$: BehaviorSubject<boolean>= new BehaviorSubject(true);
  getSeries$: BehaviorSubject<boolean>= new BehaviorSubject(true);
  getheaderList$: BehaviorSubject<boolean>= new BehaviorSubject(true);
  getUpcomingList$:BehaviorSubject<boolean>= new BehaviorSubject(true);
  getVideos$: BehaviorSubject<boolean>= new BehaviorSubject(true);
  getDetail$: BehaviorSubject<boolean>= new BehaviorSubject(true);

  apiKey='767966187834fddd8ff19b00e6a923f5'

  constructor(private http: HttpClient) { }


  getMoviesList() {

    

    return this.getList$.pipe(switchMap(()=> this.http.get<any>(`${env.trendingUrl}api_key=${this.apiKey}`,{
      headers: headers
    })))
    


    // return this.http.get<any>(`${this.baseUrl}?api_key=${this.apiKey}`, {
    //   headers: headers
      
    // });
  }

  getLatest(){

    

    return this.getLatest$.pipe(switchMap(()=> this.http.get<any>(`${env.baseUrl}api_key=${this.apiKey}`, {
      headers:headers
    })))

  }


  getOnAirSeries(){

    
    return this.getSeries$.pipe(switchMap(()=> this.http.get<any>(`${env.onAirUrl}api_key=${this.apiKey}`,{

      headers:headers
    })
  ))
    

  }

  getHeaderList(){


    

    return this.getheaderList$.pipe(switchMap(()=>

       this.http.get<any>(`${env.headerListUrl}api_key=${this.apiKey}`, {

        headers: headers
      })
    ))

  }


  
  getUpcomingList(){

 

    return this.getUpcomingList$.pipe(switchMap(()=>

       this.http.get<any>(`${env.upcomingUrl}api_key=${this.apiKey}`, {

        headers: headers
      })
    ))

  }


    getVideos(id:string){
 
    return this.getVideos$.pipe(switchMap(()=> this.http.get<any>(`${env.moviesVideos}${id}/videos?api_key=${this.apiKey}`, {
      headers:headers
    })))

  }

  getDetail(id: string){


   return  this.getDetail$.pipe(switchMap(()=> this.http.get<any>(`${env.detailsUrl}${id}?api_key=${this.apiKey}`)))

  }


  }




