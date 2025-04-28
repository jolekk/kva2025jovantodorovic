import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { Actor, MovieModel } from '../../models/movie.model';
import { AxiosError } from 'axios';

@Component({
  selector: 'app-actor',
  imports: [],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css',
})
export class ActorComponent {
  public actor: Actor | null = null;
  public movies: MovieModel[] | null = [];
  public error: string | null = null;
  public constructor(
    private route: ActivatedRoute,
    public utils: UtilsService
  ) {
    route.params.subscribe((params) => {
      MovieService.getActorById(params['id'])
        .then((response) => {
          this.actor = response.data;
          console.log(this.actor);
        })
        .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));

      MovieService.getMovies('', params['id'], '', '', '')
        .then((response) => {
          this.movies = response.data;
          console.log(this.movies);
        })
        .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));
    });
  }
}
