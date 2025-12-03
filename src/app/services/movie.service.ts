import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movie } from '../movies/interfaces/movie.interface';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private apiUrl = environment.tmdbApiUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1, endpoint: string = 'popular'): Observable<Movie[]> {
    const url = `${this.apiUrl}/${endpoint}`;
    const params = {
      api_key: this.apiKey,
      language: 'es-ES',
      page: page.toString()
    };
    return this.http.get<{ results: Movie[] }>(url, { params }).pipe(
      map(response => response.results)
    );
  }

}
