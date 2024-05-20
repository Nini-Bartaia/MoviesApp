import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environments/env';
import { headers } from '../../types/headerType';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  // ამ ეტაპზე behavior subject ები არ გვჭირდება
  constructor(private http: HttpClient) {}

  getMoviesList() {
    return this.http.get<any>(
      `${env.trendingUrl}`,
      this.returnHttpParams({ api_key: env.apiKey }),
    );
  }

  getLatest() {
    return this.http.get<any>(
      `${env.baseUrl}`,
      this.returnHttpParams({ api_key: env.apiKey }),
    );
  }

  getOnAirSeries() {
    return this.http.get<any>(
      `${env.onAirUrl}`,
      this.returnHttpParams({ api_key: env.apiKey }),
    );
  }

  getHeaderList() {
    return this.http.get<any>(
      `${env.headerListUrl}`,
      this.returnHttpParams({ api_key: env.apiKey }),
    );
  }

  getUpcomingList() {
    return this.http.get<any>(
      `${env.upcomingUrl}`,
      this.returnHttpParams({ api_key: env.apiKey }),
    );
  }

  getVideos(id: string) {
    return this.http
      .get<any>(
        `${env.moviesVideos}${id}/videos`,
        this.returnHttpParams({ api_key: env.apiKey }),
      )
      .pipe(
        map((data: any) => {
          const trailers = data.results.filter(
            (video: any) => video.type === 'Trailer',
          );

          trailers.forEach((trailer: any) => {
            trailer.published_at = new Date(trailer.published_at); //ეს დააბრუნებს იმ დატას რაც გჭირდება
          });

          const maxDateTrailer = trailers.reduce((prev: any, current: any) => {
            return prev.published_at > current.published_at ? prev : current;
          });

          return [maxDateTrailer];
        }),
      );
  }

  getDetail(id: string) {
    return this.http.get<any>(
      `${env.detailsUrl}${id}`,
      this.returnHttpParams({ api_key: env.apiKey }),
    );
  }

  getMovieWithGenres(id: string) {
    return this.http.get<any>(
      `${env.movieWithGenres}/movie`,
      this.returnHttpParams({ with_genres: id, api_key: env.apiKey }),
    );
  }

  getGenresForMovies(){

    return this.http.get<any>(
      `${env.getGenres}`, this.returnHttpParams({api_key:env.apiKey})
    )
  }
  getAllMovies(){

    return this.http.get<any>(
      `${env.getAllMovies}`, this.returnHttpParams({api_key:env.apiKey})
    )
  }



  returnHttpParams(object?: any) {
    //ეს ფუნქცია დააბრუნებს პარამსებს და ხელით არ დაგჭირდება გაწერა, გადმოეცი ობიეტი რა პარამსებიც გჭირდება იმის მიხედვით
    let queryParams = new HttpParams();
    object &&
      Object.keys(object).forEach(
        (key: string) => (queryParams = queryParams.append(key, object[key])),
      );

    return { headers: headers, params: object ? queryParams : {} };
  }
}
