import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GENRES } from '../../constants/genres.constant';
import { GenreOption } from '../../interfaces/genre-option.interface';
import { noSpecialCharsValidator } from '../../../validators/custom-validators';

@Component({
  selector: 'app-peliculas-form',
  templateUrl: './peliculas-form.component.html',
  styleUrls: ['./peliculas-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PeliculasFormComponent {
  @Output() search = new EventEmitter<{ titulo: string, genero: string, puntuacion: number }>();
  filtrosForm: FormGroup;
  generos: GenreOption[] = GENRES;
  generoActualIndex = 0;

  get generoActualLabel() {
    return this.generos[this.generoActualIndex].label;
  }

  constructor(private fb: FormBuilder) {
    this.filtrosForm = this.fb.group({
      titulo: ['', [noSpecialCharsValidator()]],
      genero: [this.generos[0].value],
      puntuacion: [0]
    });
  }

  cambiarGenero(direccion: number): void {
    this.generoActualIndex = (this.generoActualIndex + direccion + this.generos.length) % this.generos.length;
    this.filtrosForm.get('genero')?.setValue(this.generos[this.generoActualIndex].value);
  }

  limpiarFiltros(): void {
    this.filtrosForm!.reset({
      titulo: '',
      genero: this.generos[0].value,
      puntuacion: 0
    });
    this.generoActualIndex = 0;
    // Opcional: Emitir búsqueda vacía al limpiar para volver a cargar las populares
    this.onSubmit(); 
  }

  onSubmit(): void {
    if (this.filtrosForm.valid) {
      console.log('Emitiendo filtros:', this.filtrosForm.value);
      this.search.emit(this.filtrosForm.value);
    }
  }
}
