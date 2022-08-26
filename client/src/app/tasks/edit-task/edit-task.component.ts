import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task
  ) { }

  ngOnInit(): void {
    console.log('task:', this.task)
  }

  editTask(form: NgForm) {
    this.task.content = form.value.content;
    this.dialogRef.close(this.task.content)
  }

  close() {
    this.dialogRef.close();
  }

}
