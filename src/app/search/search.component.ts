import { Component, OnDestroy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from '../loading/loading.component';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MovieService } from '../../services/movie.service';
import { Director, Actor, MovieModel, Genre } from '../../models/movie.model';
import { AxiosError } from 'axios';
import { Subject, debounceTime, filter } from 'rxjs';
import { MovieComponent } from '../movie/movie.component';
import {PageheaderComponent} from '../pageheader/pageheader.component';

@Component({
  selector: 'app-search',
  imports: [
    MatTableModule,
    NgIf,
    NgFor,
    MatButtonModule,
    LoadingComponent,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MovieComponent,
    PageheaderComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnDestroy {
  public movies: MovieModel[] = [];

  userInput: string = '';

  listRunTime: number[] | null = [];
  selectedRunTime: number | null = null;

  listActor: Actor[] | null = [];
  selectedActor: number | null = null;

  listDirector: Director[] | null = [];
  selectedDirector: number | null = null;
  
  listGenre: Genre[] | null = [];
  selectedGenre: number | null = null;

  private searchSubject = new Subject<string>();

  public error: string | null = null;
  constructor(public utils: UtilsService) {
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.doFilterChain();
    });
    this.fetchInitialData();
  }

  fetchInitialData() {
    MovieService.getMovies('', '', '', '', '')
      .then((response) => (this.movies = response.data))
      .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));

    MovieService.getRunTime()
      .then((response) => (this.listRunTime = response.data))
      .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));

    MovieService.getActor()
      .then((response) => (this.listActor = response.data))
      .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));

    MovieService.getDirector()
      .then((response) => (this.listDirector = response.data))
      .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));
    
    MovieService.getGenre()
      .then((response) => (this.listGenre = response.data))
      .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));
  }

  onUserInputChange() {
    // this.searchSubject.next(this.userInput);
    this.searchSubject.next(this.userInput.trim());
  }
  public doFilterChain() {
    MovieService.getMovies(
      this.userInput,
      this.selectedActor?.toString() || '',
      this.selectedGenre?.toString() || '',
      this.selectedDirector?.toString() || '',
      this.selectedRunTime?.toString() || ''
    )
      .then((response) => {
        this.movies = response.data;
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }

  public handleReset() {
    this.selectedGenre = null;
    this.selectedRunTime = null;
    this.selectedActor = null;
    this.selectedDirector = null;
    this.userInput = '';
    this.doFilterChain();
  }

  ngOnDestroy() {
    this.searchSubject.unsubscribe();
  }
}
