import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Task } from '../tasks/task.model';
import { IsLoggedInService } from './is-logged-in.service';

const url = 'http://localhost:3030/';

@Injectable({providedIn: 'root'})

export class TasksService {
  constructor(
    private isLoggedInService: IsLoggedInService,
    private http: HttpClient,
  ){}

  token = this.isLoggedInService.getToken();
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();
  httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': 'Bearer ' + this.token
  })};

  getTasks() {
    return [...this.tasks];
  }

  fetchTasks(username: string) {
    const user = {author: username};
    this.http.post(url + 'tasks/list', user, this.httpOptions)
      .subscribe((data: any) => {
        this.tasksUpdated.next([...data]);
        this.tasks = data;
        console.log(data);
        return [...data];
      })
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  createTask(data: Task) {
    this.tasks.push(data);
    this.tasksUpdated.next([...this.tasks]);
    this.http.post(url + 'tasks/create', data, this.httpOptions)
      .subscribe((res:any) => {});
  }

  updateTask(id: string, content: string) {
    const data = {id, content};
    console.log(this.tasks.find(o => Object.values(o)[0] === id));
    this.http.post(url + 'tasks/update', data, this.httpOptions)
      .subscribe((res:any) => {});
  }

  deleteTask(id: string) {
    const data = {id};
    this.http.post(url + 'tasks/delete', data, this.httpOptions)
      .subscribe((res:any) => {});
  }
}
