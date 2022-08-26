import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../task.model';
import { TasksService } from '../../services/tasks.service';
import { IsLoggedInService } from '../../services/is-logged-in.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  constructor (
    private tasksService: TasksService,
    private isLoggedInService: IsLoggedInService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}
  taskId: string = '';
  tasks: Task[] = [];
  tasksSub: Subscription = new Subscription;
  isUserLoggedIn = this.isLoggedInService.isAuthenticated;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        console.log('listid:', params.listid);
      }
    })
    this.tasks = this.tasksService.getTasks();
    this.tasksSub = this.tasksService.getTaskUpdateListener()
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        this.taskId = Object.values(tasks[0])[0];
      });
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }

  editTask(task: Task) {
    const id = Object.values(task)[0];
    let dialogRef = this.dialog.open(EditTaskComponent, {
      width: '700px',
      data: task
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.tasksService.updateTask(id, res);
      }
    })
  }

  deleteTask(task: Task) {
    const id = Object.values(task)[0];
    this.tasks.splice(this.tasks.indexOf(task), 1);
    this.tasksService.deleteTask(id);
  }
}
