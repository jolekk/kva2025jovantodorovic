import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MovieService } from '../../services/movie.service';
import { Genre } from '../../models/movie.model';
import { AxiosError } from 'axios';

@Component({
  selector: 'app-signup',
  imports: [
    MatCardModule,
    NgFor,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  public destinationList: string[] = [];
  public email = '';
  public password = '';
  public repeatPassword = '';
  public firstName = '';
  public lastName = '';
  public phone = '';
  public address = '';
  public destination = '';
  public genres: Genre[] = [];
  public error: string | null = null;
  public listGenre: Genre[] | null = [];
  public selectedGenre: number | null = null;

  public constructor(private router: Router) {
    FlightService.getDestinations().then(
      (rsp) => (this.destinationList = rsp.data)
    );
  }

  ngOnInit() {
    MovieService.getGenre()
      .then((response) => (this.listGenre = response.data))
      .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));
  }

  public doSignup() {
    if (this.email == '' || this.password == '') {
      alert('Email and password are required fields');
      return;
    }

    if (this.password !== this.repeatPassword) {
      alert('Passwords dont match');
      return;
    }

    const result = UserService.createUser({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      favouritegenre: this.selectedGenre?.toString() || '',
      orders: [],
    });

    result ? this.router.navigate(['/login']) : alert('Email is already taken');
  }
}
