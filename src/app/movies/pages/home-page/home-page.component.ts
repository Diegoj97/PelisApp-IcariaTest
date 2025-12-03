import { Component, inject, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MovieService } from '../../../services/movie.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [MovieListComponent],
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  movieService = inject(MovieService);
  moviesSignal = toSignal(this.movieService.getMoviesPaginated());

  constructor() {
    effect(() => {
      const data = this.moviesSignal();
      if (data) {
        console.log(data); 
      }
    });
  }
}

