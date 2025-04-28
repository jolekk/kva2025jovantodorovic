import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { NgFor, NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from '../loading/loading.component';
import { MovieComponent } from '../movie/movie.component';
import { RouterLink } from '@angular/router';
import { PageheaderComponent } from '../pageheader/pageheader.component';
import { MovieModel } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    MatCardModule,
    LoadingComponent,
    RouterLink,
    MovieComponent,
    PageheaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public movies: MovieModel[] | null = [];
  public error: string | null = null;

  constructor(public utils: UtilsService) {
    MovieService.getMovies('', '', '', '', '')
      .then((response) => {
        this.movies = response.data;
      })
      .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));

    MovieService.getGenre()
      .then((response) => {
        console.log({ response });
        this.movies = response.data;
      })
      .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));
  }
}
