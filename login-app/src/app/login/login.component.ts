import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { SnackbarComponent } from '../utility/snackbar/snackbar.component';
import { LoaderComponent } from '../utility/loader/loader.component';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthResponse } from '../Model/auth-response';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, SnackbarComponent, LoaderComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLogin: boolean = true;
  isLoading: boolean = false;
  authService: AuthService = inject(AuthService);
  errorMessage: string | null = null;
  authObs: Observable<AuthResponse>;
  route: Router = inject(Router)

  onSubmittedForm(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    
    this.isLoading = true;

    if (this.isLogin) {
      this.authObs = this.authService.login(email, password);
    } else {
      this.authObs = this.authService.signUp(email, password);
    }

    this.authObs.subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.route.navigate(['dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.errorMessage = "Something went wrong";

        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    });

    form.reset();
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}
