import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environments/env';
import { headers } from '../../types/headerType';
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
    return this.http.get<any>(
      `${env.moviesVideos}${id}/videos`,
      this.returnHttpParams({ api_key: env.apiKey }),
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
