import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, exhaustMap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  getList$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  getLatest$: BehaviorSubject<boolean>= new BehaviorSubject(true);


  constructor(private http: HttpClient) { }



   baseUrl='https://api.themoviedb.org/3/movie/now_playing?'
   apiKey='767966187834fddd8ff19b00e6a923f5'
   trendingUrl='https://api.themoviedb.org/3/trending/movie/day?'
   latestUrl='https://api.themoviedb.org/3/movie/latest?'

  getMoviesList() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

    });

    return this.getList$.pipe(switchMap(()=> this.http.get<any>(`${this.trendingUrl}api_key=${this.apiKey}`,{
      headers: headers
    })))
    


    // return this.http.get<any>(`${this.baseUrl}?api_key=${this.apiKey}`, {
    //   headers: headers
      
    // });
  }

  getLatest(){


    const headers= new HttpHeaders({

      'Content-Type':'application/json'
    })

    return this.getLatest$.pipe(switchMap(()=> this.http.get<any>(`${this.baseUrl}api_key=${this.apiKey}`, {
      headers:headers
    })))

  }




}
