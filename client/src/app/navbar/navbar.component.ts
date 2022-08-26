import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IsLoggedInService } from '../services/is-logged-in.service';
import { UsersService } from '../services/users.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isLoginPage = false;
  display = '';
  greeting = 'Hello!';
  currentRoute = '';

  constructor(
    private usersService: UsersService,
    private isLoggedInService: IsLoggedInService,
    private router: Router,
  ) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((nav: any) => {
        if (nav['url'] !== '/' && nav['url'] !== '/register') {
          this.greeting = 'Please ';
          this.currentRoute = nav['url'].substr(1);
          if (!this.isLoggedIn) {
            this.router.navigate(['/login'])
          }
        } else {
          this.greeting = 'Hello!';
          this.currentRoute = '';
        }
      });
    }

  ngOnInit(): void {
    this.isLoggedInService.isUserLoggedIn.subscribe((userLoggedIn: any) => {
      this.display = this.usersService.getUser().username;
      this.isLoggedIn = userLoggedIn;
    });
  }

  logout() {
    this.isLoggedInService.setIsLoggedIn(false);
    this.router.navigate(['/'])
  }
  login() {
    this.router.navigate(['/login']);
  }
  register() {
    this.router.navigate(['/register']);
  }
}
