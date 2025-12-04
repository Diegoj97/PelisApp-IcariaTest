import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../services/movie.service';
import { Movie } from '../../interfaces/movie.interface';
import { LoaderComponent } from '../../../components/common/loader/loader.component';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, LoaderComponent, RouterModule],
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  movie = signal<Movie | null>(null);
  loading = signal(true);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadMovie(id);
      }
    });
  }

  loadMovie(id: string) {
    this.loading.set(true);
    this.movieService.getMovieById(id).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading movie', err);
        this.loading.set(false);
      }
    });
  }
}
