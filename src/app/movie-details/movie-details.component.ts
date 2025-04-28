import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { MovieModel, MovieGenre } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NgIf, CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from '../loading/loading.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { SafePipe } from '../safe.pipe';
import { MovieComponent } from '../movie/movie.component';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-movie-details',
  imports: [
    NgIf,
    LoadingComponent,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    SafePipe,
    RouterLink,
    MatChipsModule,
    CommonModule,
    MovieComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  public movie: MovieModel | null = null;
  public movies: MovieModel[] | null = [];
  public movieGenres: MovieGenre[] = [];
  public error: string | null = null;
  public service = UserService;

  public constructor(
    private route: ActivatedRoute,
    public utils: UtilsService,
    private router: Router
  ) {
    MovieService.getMovies('', '', '', '', '')
      .then((response) => {
        this.movies = response.data.slice(0, 4);
      })
      .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));

    route.params.subscribe((params) => {
      MovieService.getMovieById(params['id']).then((response) => {
        this.movie = response.data;
        this.movieGenres = this?.movie?.movieGenres ?? [];
        console.log(this.movie);
      });
    });
  }

  public doOrder(date: string, roomTime: string, movie: MovieModel): void {
      Swal.fire({
        title: `Place an order to ${movie?.title} ${date} ${roomTime}?`,
        text: "Orders can be canceled any time from your user profile!",
        icon: "info",
        showCancelButton: true,
        customClass: {
          popup: 'bg-dark'
        },
        confirmButtonColor: "#464646",
        cancelButtonColor: "#602121",
        confirmButtonText: "Yes, place an order!"
      }).then((result) => {
        console.log({result});
        if (result.isConfirmed) {
          const { director, movieActors, movieGenres, ...filteredMovie } = movie;
          const response = UserService.createOrder({
            ...filteredMovie,
            id: new Date().getTime(),
            count: 1,
            pricePerItem: 799,
            status: 'ordered',
            rating: null,
            room: roomTime,
            dateProjection: date
          })
          console.log({response});
          result ? this.router.navigate(['/user']) :
            Swal.fire({
              title: "Failed crating an order",
              text: "Something is wrong with your order!",
              icon: "error"
            });
        }
      })
    }

}
