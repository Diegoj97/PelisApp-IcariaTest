import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
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
      delay(2000),
      map(response => ({
        movies: response.results,
        total: response.total_results,
        totalPages: response.total_pages
      }))
    );
  }

  getFilteredMovies(filters: { titulo?: string, genero?: string, puntuacion?: number }, page: number = 1): Observable<{ movies: Movie[], total: number, totalPages: number }> {
    let url = '';
    const params: any = {
      api_key: this.apiKey,
      language: 'es-ES',
      page: page.toString()
    };

    if (filters.titulo) {
      // Usamos el endpoint de búsqueda si hay título
      url = this.apiUrl.replace('/movie', '/search/movie');
      params.query = filters.titulo;
    } else {
      // Usamos discover si es por filtros (género, puntuación)
      url = this.apiUrl.replace('/movie', '/discover/movie');
      
      if (filters.genero) {
        params.with_genres = filters.genero;
      }
      
      if (filters.puntuacion) {
        params['vote_average.gte'] = filters.puntuacion;
      }
    }

    return this.http.get<{ results: Movie[], total_pages: number, total_results: number }>(url, { params }).pipe(
      delay(2000),
      map(response => ({
        movies: response.results,
        total: response.total_results,
        totalPages: response.total_pages
      }))
    );
  }


}
