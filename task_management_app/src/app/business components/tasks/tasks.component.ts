import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from './task.model';
import { TaskService } from '../../services/task.service';
import { TaskformComponent } from '../taskform/taskform.component';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;
  tasksdata = new MatTableDataSource<Task>();
  searchQuery: string = '';
  displayedColumns: string[] = ['title', 'description', 'priority', 'dueDate', 'status', 'actions'];

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasksdata.data = tasks;
    });
    this.tasksdata.sort = this.sort;
  }

  applyFilters() {
    let filterValue = this.searchQuery.trim().toLowerCase();
    this.tasksdata.filter = filterValue;
  }

  sortData(sort: Sort) {
    const data = this.tasksdata.data.slice();
    if (!sort.active || sort.direction === '') {
      this.tasksdata.data = data;
      return;
    }
    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'priority':
          return compare(a.priority, b.priority, isAsc);
        case 'dueDate':
          return compare(a.dueDate, b.dueDate, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
    this.tasksdata.data = sortedData;
  }

  drop(event: any) {
    moveItemInArray(this.tasksdata.data, event.previousIndex, event.currentIndex);
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskformComponent, { width: '300px' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasksdata.data = [...this.tasksdata.data, result];
        this.applyFilters();
      }
    });
  }

  openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskformComponent, {
      width: '300px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.tasksdata.data.findIndex((t) => t.id === result.id);
        if (index !== -1) {
          this.tasksdata.data[index] = result;
          this.applyFilters();
        }
      }
    });
  }

  openDeleteConfirmationDialog(task: Task): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasksdata.data = this.tasksdata.data.filter((t) => t.id !== task.id);
        this.applyFilters();
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
