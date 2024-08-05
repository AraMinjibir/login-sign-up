import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { SnackbarComponent } from '../utility/snackbar/snackbar.component';
import { TaskServiceService } from '../Services/task-service.service';
import { LoaderComponent } from '../utility/loader/loader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, SnackbarComponent,  LoaderComponent, NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
isLogin: boolean = true;
isLoading: boolean = false;
authService: AuthService = inject(AuthService);
errorMessage: string | null = null;

  onSubmittedForm(form: NgForm){
    if(this.isLogin === true){

    }else{
      this.isLoading = true;
      const email = form.value.email;
      const password = form.value.password;
    this.authService.signUp(email, password).subscribe(() => {
    next: (res) => {
      
      console.log(res)
      
    }
    error: (err) =>{
      this.isLoading = false;
      console.log(err)

      this.errorMessage = "Something went wrong";

      setTimeout(()=>
        { this.errorMessage = null;

      }, 5000)
      
    }
   })
    }
    form.reset()
  }

  toggleForm(){
    this.isLogin = !this.isLogin;
  }
}
