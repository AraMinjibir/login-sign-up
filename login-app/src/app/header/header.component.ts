import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { User } from '../Model/user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  authService: AuthService = inject(AuthService);
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.user.subscribe((user: User | null) => {
      this.isLoggedIn = !!user;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
