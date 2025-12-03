import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../interfaces/movie.interface';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  imports: [MovieCardComponent, MatButtonModule, MatIconModule],
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
  movieService = inject(MovieService);
  currentPage: number = 1;
  pageSize: number = 18;
  totalMovies: number = 0;
  totalPages: number = 0;

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMoviesPaginated(this.currentPage, this.pageSize).subscribe((response) => {
      this.movies = response.movies;
      this.totalMovies = response.total;
      this.totalPages = response.totalPages;
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }
}
