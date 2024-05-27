import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environments/env';
import { headers } from '../../types/headerType';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  private selectedItemsSubject: BehaviorSubject<any> = new BehaviorSubject<
    any[]
  >([]);
  selectedItems$: Observable<any> = this.selectedItemsSubject.asObservable();

  // ამ ეტაპზე behavior subject ები არ გვჭირდება
  constructor(private http: HttpClient) {}

  addToSelectedItems(item: any) {
    const currentItems = this.selectedItemsSubject.getValue();

    this.selectedItemsSubject.next([...currentItems, item]);
    console.log(this.selectedItemsSubject.getValue());

    // return this.http.post<any>(
    //   `${env.watchlistUrl}`,
    //   this.returnHttpParams({ RAW_BODY: item }),
    // );
  }

  getWatchlist() {
    return this.http.get<any>(`${env.getwatchlist}`, this.returnHttpParams());
  }

  getMoviesList() {
    return this.http.get<any>(`${env.trendingUrl}`, this.returnHttpParams());
  }

  getLatest() {
    return this.http.get<any>(`${env.baseUrl}`, this.returnHttpParams());
  }

  getOnAirSeries() {
    return this.http.get<any>(`${env.onAirUrl}`, this.returnHttpParams());
  }

  getHeaderList() {
    return this.http.get<any>(`${env.headerListUrl}`, this.returnHttpParams());
  }

  getUpcomingList() {
    return this.http.get<any>(`${env.upcomingUrl}`, this.returnHttpParams());
  }

  getSeries() {
    return this.http.get<any>(`${env.seriesUrl}`, this.returnHttpParams());
  }

  getSeriesGenres() {
    return this.http.get<any>(
      `${env.seriesGenresUrl}`,
      this.returnHttpParams(),
    );
  }
  getVideos(id: string) {
    return this.http
      .get<any>(`${env.moviesVideos}${id}/videos`, this.returnHttpParams())
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
      this.returnHttpParams(),
    );
  }

  getMovieWithGenres(id: string) {
    return this.http.get<any>(
      `${env.movieWithGenres}/movie`,
      this.returnHttpParams({ with_genres: id }),
    );
  }

  getGenresForMovies() {
    return this.http.get<any>(`${env.getGenres}`, this.returnHttpParams());
  }

  getAllMovies(startDate?: string, endDate?: string, id?: string) {
    const params: any = {};

    if ((startDate && endDate) || id) {
      params['primary_release_date.gte'] = startDate;
      params['primary_release_date.lte'] = endDate;
      return this.http.get<any>(
        `${env.getAllMovies}`,
        this.returnHttpParams({
          'primary_release_date.gte': startDate,
          'primary_release_date.lte': endDate,
          with_genres: id,
        }),
      );
    } else {
      return this.http.get<any>(`${env.getAllMovies}`, this.returnHttpParams());
    }
  }

  getAllSeries(startDate?: string, endDate?: string, id?: string) {
    const params: any = {};
    if ((startDate && endDate) || id) {
      params['first_air_date.gte'] = startDate;
      params['first_air_date.lte'] = endDate;
      return this.http.get<any>(
        `${env.getSeriesUrl}`,
        this.returnHttpParams({
          'first_air_date.gte': startDate,
          'first_air_date.lte': endDate,
          with_genres: id,
        }),
      );
    } else {
      return this.http.get<any>(`${env.getSeriesUrl}`, this.returnHttpParams());
    }
  }

  searchMovie(movie: string) {
    return this.http.get<any>(
      `${env.searchUrl}`,
      this.returnHttpParams({ query: movie }),
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
