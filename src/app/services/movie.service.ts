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

  getMoviesPaginated(page: number = 1, pageSize: number = 18, endpoint: string = 'popular'): Observable<{ movies: Movie[], total: number, totalPages: number }> {
    const url = `${this.apiUrl}/${endpoint}`;
    const params = {
      api_key: this.apiKey,
      language: 'es-ES',
      page_size: pageSize.toString(),
      page: page.toString()
    };
    return this.http.get<{ results: Movie[], total_pages: number, total_results: number }>(url, { params }).pipe(
      map(response => ({
        movies: response.results,
        total: response.total_results,
        totalPages: response.total_pages
      }))
    );
  }

}
