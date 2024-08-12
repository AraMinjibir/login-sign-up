import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { canActivate } from './RouteGuard/authGuard';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [canActivate ]},
    {path: 'login', component: LoginComponent}
];
