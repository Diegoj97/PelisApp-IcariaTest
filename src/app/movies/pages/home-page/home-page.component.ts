import { Component, inject, signal, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { PeliculasFormComponent } from '../../components/peliculas-form/peliculas-form.component';
import { Movie } from '../../interfaces/movie.interface';
import { LoaderComponent } from '../../../components/common/loader/loader.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [MovieListComponent, PeliculasFormComponent, LoaderComponent],
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  movieService = inject(MovieService);
  
  // Usamos una señal de escritura para poder actualizarla manualmente
  movies = signal<Movie[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  totalPages = signal(0);
  currentFilters: any = {};

  ngOnInit() {
    this.loadInitialMovies();
  }

  loadInitialMovies() {
    this.loading.set(true);
    this.movies.set([]);
    this.movieService.getMoviesPaginated(this.currentPage()).subscribe({
      next: (response) => {
        this.movies.set(response.movies);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading movies', err);
        this.loading.set(false);
      }
    });
  }

  onSearch(filters: any) {
    this.loading.set(true);
    this.movies.set([]);
    this.currentFilters = filters;
    this.currentPage.set(1); // Reset page to 1 on new search

    this.movieService.getFilteredMovies(filters, this.currentPage()).subscribe({
      next: (response) => {
        this.movies.set(response.movies);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error searching movies', err);
        this.loading.set(false);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loading.set(true);
    this.movies.set([]);
    
    // Check if we have active filters (simple check, can be improved)
    const hasFilters = this.currentFilters && (this.currentFilters.titulo || this.currentFilters.genero || this.currentFilters.puntuacion);

    if (hasFilters) {
        this.movieService.getFilteredMovies(this.currentFilters, page).subscribe({
            next: (response) => {
                this.movies.set(response.movies);
                this.totalPages.set(response.totalPages);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Error changing page', err);
                this.loading.set(false);
            }
        });
    } else {
        this.movieService.getMoviesPaginated(page).subscribe({
            next: (response) => {
                this.movies.set(response.movies);
                this.totalPages.set(response.totalPages);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Error changing page', err);
                this.loading.set(false);
            }
        });
    }
  }
}

