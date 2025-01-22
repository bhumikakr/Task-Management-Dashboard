import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../tasks/task.model';

@Component({
  selector: 'app-taskform',
  templateUrl: './taskform.component.html',
  styleUrl: './taskform.component.css'
})
export class TaskformComponent implements OnInit {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    status: 'Pending'
  };

  priorities: string[] = ['Low', 'Medium', 'High'];
  statuses: string[] = ['Pending', 'Completed'];

  constructor(
    public dialogRef: MatDialogRef<TaskformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.task = this.data;
    }
  }

  onSubmit(): void {
    if (this.task.title && this.task.description && this.task.dueDate) {
      this.dialogRef.close(this.task);
    } else {
      console.error('Form is invalid');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
