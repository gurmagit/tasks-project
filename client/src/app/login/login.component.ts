import { Component, Input, OnInit } from '@angular/core';
import { IsLoggedInService } from '../services/is-logged-in.service';
import { UsersService } from '../services/users.service';
import { TasksService } from '../services/tasks.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Task } from '../tasks/task.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  name: string = '';
  password: string = '';
  badCred: boolean = false;
  tasks: Task[] = [];

  constructor(
    private isLoginedInService: IsLoggedInService,
    private usersService: UsersService,
    private tasksService: TasksService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.isLoginedInService.setIsLoggedIn(false);
  }

  login(form: NgForm) {
    const value = form.value;
    this.usersService.login(value.username, value.password, (res: string) => {
      // console.log('res:', res);
      if (res == 'authenticate') {
        this.isLoginedInService.setIsLoggedIn(true);
        this.tasksService.fetchTasks(value.username);
        this.router.navigate(['tasks']);
      } else {
        this.badCred = true;
        console.log('could not login');
      }
    });
  }
}
