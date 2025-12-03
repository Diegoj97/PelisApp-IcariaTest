import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  filtrosForm: FormGroup;
  generos = [
    { value: '', label: 'Cualquiera' },
    { value: 'accion', label: 'Acción' },
    { value: 'terror', label: 'Terror' },
    { value: 'drama', label: 'Drama' }
  ];
  generoActualIndex = 0;

  get generoActualLabel() {
    return this.generos[this.generoActualIndex].label;
  }

  constructor(private fb: FormBuilder) {
    this.filtrosForm = this.fb.group({
      titulo: [''],
      genero: [this.generos[0].value],
      puntuacion: [0]
    });

    this.filtrosForm.valueChanges.subscribe(valores => {
      console.log('Nuevos valores de filtro:', valores);
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
  }

  onSubmit(): void {
    console.log('Filtros aplicados:', this.filtrosForm!.value);
  }
}
