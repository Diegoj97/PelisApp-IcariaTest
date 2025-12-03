import { Component, signal } from '@angular/core';


import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/common/footer.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PelisApp-IcariaTest');
}
