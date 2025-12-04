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

    const isSearch = !!(filters.titulo && filters.titulo.trim());

    if (isSearch) {
      // Usamos el endpoint de búsqueda si hay título
      url = this.apiUrl.replace('/movie', '/search/movie');
      params.query = filters.titulo!.trim();
    } else {
      // Usamos discover si es por filtros (género, puntuación)
      url = this.apiUrl.replace('/movie', '/discover/movie');
      
      if (filters.genero) {
        params.with_genres = filters.genero;
      }
      
      if (filters.puntuacion && Number(filters.puntuacion) > 0) {
        params['vote_average.lte'] = filters.puntuacion;
      }
    }

    return this.http.get<{ results: Movie[], total_pages: number, total_results: number }>(url, { params }).pipe(
      delay(2000),
      map(response => {
        let movies = response.results;
        let total = response.total_results;
        let totalPages = response.total_pages;

        // Si estamos en modo búsqueda (search), la API no filtra por género ni puntuación,
        // así que lo hacemos manualmente en el cliente sobre los resultados de esta página.
        if (isSearch) {
          if (filters.puntuacion && Number(filters.puntuacion) > 0) {
            const maxScore = Number(filters.puntuacion);
            movies = movies.filter(movie => movie.vote_average <= maxScore);
          }
          if (filters.genero) {
            const genreId = Number(filters.genero);
            movies = movies.filter(movie => movie.genre_ids && movie.genre_ids.includes(genreId));
          }

          // Si tras filtrar no quedan películas, asumimos 0 resultados para evitar paginación vacía
          if (movies.length === 0) {
            total = 0;
            totalPages = 0;
          }
        }

        return {
          movies: movies,
          total: total,
          totalPages: totalPages
        };
      })
    );
  }


}
