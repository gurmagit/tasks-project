import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../tasks/task.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {}

  register(form: NgForm) {
    const user: User = {
      username: form.value.username,
      password: form.value.password,
    }
    this.usersService.newUser(user, (res: any) => {
      if (res) {
        console.log(res.user, 'was created!');
        form.reset();
        this.router.navigate(['/login']);
      } else {
        console.log('error has occured');
      }
    })
  }
}
