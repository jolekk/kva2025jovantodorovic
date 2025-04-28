import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { AirlineComponent } from './airline/airline.component';
import { DetailsComponent } from './details/details.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
// import { OrderComponent } from './order/order.component';
import { SignupComponent } from './signup/signup.component';
import { ActorComponent } from './actor/actor.component';
import { ActorlistComponent } from './actorlist/actorlist.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'search', component: SearchComponent },
    { path: 'airlines', component: AirlineComponent },
    // { path: 'details/:id/order', component: OrderComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'actor', component: ActorlistComponent },
    { path: 'actor/:id', component: ActorComponent },
    { path: 'movie-details/:id', component: MovieDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '' }
]
