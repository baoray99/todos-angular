import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private static readonly localStorageKey = 'todos';
  private todos: Todo[];
  private filteredTodos: Todo[]; //clone All, Active, or Complete todos
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<
    Todo[]
  >([]);
  private currentFilter: Filter = Filter.All;
  private updateTodosData() {
    this.displayTodosSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }
  todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable(); // 2 bien nay se xuat ra cho cac component khac dung
  length$: Observable<number> = this.lengthSubject.asObservable();
  constructor(private storageService: LocalStorageService) {}
  fetchFromLocalStorage() {
    this.todos =
      JSON.parse(
        this.storageService.storage.getItem(TodoService.localStorageKey)
      ) || [];
    this.filteredTodos = { ...this.todos.map((todo) => ({ ...todo })) }; //clone array
    this.updateTodosData();
  }

  updateLocalStorage() {
    this.storageService.storage.setItem(
      TodoService.localStorageKey,
      JSON.stringify(this.todos)
    );
    this.filterTodos(this.currentFilter, true);
    this.updateTodosData();
  }
  filterTodos(filter: Filter, isFiltering: boolean = true) {
    this.currentFilter = filter;
    switch (filter) {
      case Filter.Active:
        this.filteredTodos = this.todos.filter((todo) => {
          !todo.isCompleted;
        });
        break;
      case Filter.Active:
        this.filteredTodos = this.todos.filter((todo) => {
          todo.isCompleted;
        });
        break;
      case Filter.All:
        this.filteredTodos = [...this.todos.map((todo) => ({ ...todo }))];
        break;
    }
  }
  addTodo(todoContent: string) {
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, todoContent);
    this.todos.unshift(newTodo); // push vao dau mang
    this.updateLocalStorage(); // update lai du lieu
    // console.log(this.todos);
  }
}
