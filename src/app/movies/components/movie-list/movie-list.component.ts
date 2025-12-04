import { Component, EventEmitter, Output, model, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { LoaderComponent } from '../../../components/common/loader/loader.component';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  imports: [MovieCardComponent, MatButtonModule, MatIconModule, LoaderComponent],
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies = model<Movie[]>([]);
  loading = input(false);
  currentPage = input(1);
  totalPages = input(0);
  
  @Output() pageChange = new EventEmitter<number>();

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.pageChange.emit(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage() {
    if (this.loading()) return;
    this.goToPage(this.currentPage() + 1);
  }

  prevPage() {
    if (this.loading()) return;
    this.goToPage(this.currentPage() - 1);
  }
}
