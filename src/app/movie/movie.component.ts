import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { MovieModel } from '../../models/movie.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie',
  imports: [NgIf, MatButtonModule, MatCardModule, LoadingComponent, RouterLink],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  encapsulation: ViewEncapsulation.None, // Disables ViewEncapsulation
})


export class MovieComponent {
  @Input() movie!: MovieModel;
  
}
