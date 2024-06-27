import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guards/auth.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ShowMineComponent } from './components/manga/show-mine/show-mine.component';
import { ShowJikanComponent } from './components/manga/show-jikan/show-jikan.component';
import { MangaGaleryComponent } from './components/manga/manga-galery/manga-galery.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: 'my-manga-list',
    component: ShowMineComponent,
    canActivate: [authGuard],
  },
  {
    path: 'add-manga',
    component: ShowJikanComponent,
    canActivate: [authGuard],
  },
  {
    path: 'manga-galery',
    component: MangaGaleryComponent,
    canActivate: [authGuard],
  },
];
