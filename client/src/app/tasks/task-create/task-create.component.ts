import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IsLoggedInService } from '../../services/is-logged-in.service';
import { TasksService } from '../../services/tasks.service';
import { UsersService } from '../../services/users.service';
import { User } from '../task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit{
  constructor(
    public tasksService: TasksService,
    public usersService: UsersService,
    public isLoggedInService: IsLoggedInService
  ) {}
  private user = {} as User;
  isUserLoggedIn = this.isLoggedInService.isAuthenticated;

  ngOnInit(): void {
    this.user = this.usersService.getUser();
    console.log('token:', this.isLoggedInService.getToken());
  }

  async onCreateTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const data = {
      title: form.value.title,
      content: form.value.content,
      author: this.user.username,
      date: new Date()
    }
    const res = await this.tasksService.createTask(data);
    form.resetForm();
  }
}
