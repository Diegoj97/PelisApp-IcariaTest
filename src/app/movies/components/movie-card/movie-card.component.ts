import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: Movie;
}
