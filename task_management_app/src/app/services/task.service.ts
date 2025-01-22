import { Injectable } from '@angular/core';
import { Task } from '../business components/tasks/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      "id": 1,
      "title": "Fix Login Bug",
      "description": "Fix issue preventing user logins.",
      "priority": "High",
      "dueDate": "2025-01-25",
      "status": "Pending"
    },
    {
      "id": 2,
      "title": "Update API Documentation",
      "description": "Add new user profile endpoints.",
      "priority": "Medium",
      "dueDate": "2025-02-01",
      "status": "Completed"
    },
    {
      "id": 3,
      "title": "Database Optimization",
      "description": "Optimize slow queries and indexes.",
      "priority": "High",
      "dueDate": "2025-02-05",
      "status": "Completed"
    },
    {
      "id": 4,
      "title": "Implement Two-Factor Authentication",
      "description": "Add two-factor authentication for logins.",
      "priority": "High",
      "dueDate": "2025-02-10",
      "status": "Pending"
    },
    {
      "id": 5,
      "title": "User Profile UI Redesign",
      "description": "Redesign user profile page for better UX.",
      "priority": "Medium",
      "dueDate": "2025-02-20",
      "status": "Completed"
    }
  ];
  
  

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  deleteTask(taskId: number): void {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
