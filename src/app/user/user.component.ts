import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MovieService } from '../../services/movie.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { OrderModel } from '../../models/order.model';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { JsonPrettyPipe } from '../json-pretty.pipe';
import { AxiosError } from 'axios';
import { Genre } from '../../models/movie.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    RouterLink,
    MatExpansionModule,
    MatAccordion,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    JsonPrettyPipe,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'title',
    'internalId',
    'runTime',
    'count',
    'pricePerItem',
    'total',
    'status',
    'actions',
  ];
  public user: UserModel | null = null;
  public userCopy: UserModel | null = null;
  public destinationList: string[] = [];
  public dataSource = new MatTableDataSource<OrderModel>();

  public oldPasswordValue = '';
  public newPasswordValue = '';
  public repeatPasswordValue = '';
  public error: string | null = null;
  public listGenre: Genre[] | null = [];

  // constructor(private router: Router, private userService: UserService) {
  //   this.dataSource = new MatTableDataSource<OrderModel>();
  // }
  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource<OrderModel>();
  }

  ngOnInit() {
    MovieService.getGenre()
      .then((response) => {
        this.listGenre = response.data;

        // Ensure favouritegenre is set AFTER genres are loaded
        if (this.user) {
          console.log(this.user);
          this.userCopy!.favouritegenre = this.listGenre?.find(
            (g) => g.genreId.toString() === this.user?.favouritegenre
          )?.name || '';
        }
      })
      .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));

    const activeUser = UserService.getActiveUser();
    if (!activeUser) {
        this.router.navigate(['/home']);
        return;
    }
    this.user = activeUser;

    this.userCopy = {
        email: this.user?.email || '',
        firstName: this.user?.firstName || '',
        lastName: this.user?.lastName || '',
        phone: this.user?.phone || '',
        address: this.user?.address || '',
        password: this.user?.password || '',
        orders: this.user?.orders || [],
        favouritegenre: '' // Set after genres are fetched
    };
    console.log(this.userCopy);
}


  public doChangePassword() {
    if (!this.oldPasswordValue || !this.newPasswordValue) {
      alert('Password cannot be empty');
      return;
    }

    if (this.newPasswordValue !== this.repeatPasswordValue) {
      alert('Passwords do not match');
      return;
    }

    if (this.oldPasswordValue !== this.user?.password) {
      alert('Incorrect old password');
      return;
    }

    const success = UserService.changePassword(this.newPasswordValue);
    alert(success ? 'Password has been changed' : 'Failed to change password');

    this.oldPasswordValue = '';
    this.newPasswordValue = '';
    this.repeatPasswordValue = '';
  }

  public doUpdateUser() {
    if (!this.userCopy) {
      alert('User not defined');
      return;
    }

    UserService.updateUser(this.userCopy);
    this.user = UserService.getActiveUser();
    if (this.user?.orders) {
      this.dataSource.data = this.user.orders; // Update table after user update
    }
    alert('User was updated');
  }

  public doPay(order: OrderModel) {
    if (UserService.changeOrderStatus('paid', order.id)) {
      this.user = UserService.getActiveUser();
      this.dataSource.data = this.user?.orders || [];
    }
  }

  public doCancel(order: OrderModel) {
    if (UserService.changeOrderStatus('canceled', order.id)) {
      this.user = UserService.getActiveUser();
      this.dataSource.data = this.user?.orders || [];
    }
  }

  public doRating(order: OrderModel, r: boolean) {
    if (UserService.changeRating(r, order.id)) {
      this.user = UserService.getActiveUser();
      this.dataSource.data = this.user?.orders || [];
    }
  }
}
