import { Component, inject, model, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { LoaderComponent } from '../../../components/common/loader/loader.component';
import { Movie } from '../../interfaces/movie.interface';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  imports: [MovieCardComponent, MatButtonModule, MatIconModule, LoaderComponent],
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies = model<Movie[]>([]);
  movieService = inject(MovieService);
  loading = signal(false);
  currentPage: number = 1;
  pageSize: number = 18;
  totalMovies: number = 0;
  totalPages: number = 0;

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movies.set([]);
    this.loading.set(true);
    this.movieService.getMoviesPaginated(this.currentPage, this.pageSize).subscribe((response) => {
      this.movies.set(response.movies);
      this.totalMovies = response.total;
      this.totalPages = response.totalPages;
      this.loading.set(false);
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage() {
    if (this.loading()) return;
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    if (this.loading()) return;
    this.goToPage(this.currentPage - 1);
  }
}
