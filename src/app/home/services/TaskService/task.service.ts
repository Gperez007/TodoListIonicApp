import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly tasksSubject = new BehaviorSubject<any[]>(this.getTasksFromStorage());
  tasks$ = this.tasksSubject.asObservable();

  private getTasksFromStorage(): any[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  addTask(newTask: any): void {
    const currentTasks = this.getTasksFromStorage();
    const updatedTasks = [...currentTasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    this.tasksSubject.next(updatedTasks); 
  }

  removeTask(index: number): void {
    const currentTasks = this.getTasksFromStorage();
    currentTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(currentTasks));
    this.tasksSubject.next(currentTasks); 
  }

  updateTask(index: number, updatedTask: any): void {
    const currentTasks = this.getTasksFromStorage();
    currentTasks[index] = updatedTask; 
    localStorage.setItem('tasks', JSON.stringify(currentTasks));
    this.tasksSubject.next(currentTasks);
  }
}
