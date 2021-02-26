import { Injectable, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filtering.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnInit {
  private static readonly localStorageKey = 'todos';
  private todos: Todo[];
  private filteredTodos: Todo[]; //clone All, Active, or Complete todos
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  ); //behaviorSubject se luu tru gia tri cuoi cung
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
      ) || []; // tra ve mang rong khi localstorage null
    this.filteredTodos = [...this.todos]; //clone array object [{...}]
    this.updateTodosData();
  }
  updateLocalStorage() {
    this.storageService.storage.setItem(
      TodoService.localStorageKey,
      JSON.stringify(this.todos)
    );
    this.filterTodos(this.currentFilter, false);
    this.updateTodosData();
  }
  filterTodos(filter: Filter, isFiltering: boolean = true) {
    this.currentFilter = filter;
    switch (filter) {
      case Filter.Active:
        this.filteredTodos = this.todos.filter((todo) => !todo.isCompleted);
        break;
      case Filter.Completed:
        this.filteredTodos = this.todos.filter((todo) => todo.isCompleted);
        break;
      case Filter.All:
        this.filteredTodos = [...this.todos];
        break;
    }
    if (isFiltering) {
      this.updateTodosData();
    }
  }
  addTodo(todoContent: string) {
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, todoContent);
    this.todos.unshift(newTodo); // push vao dau mang
    this.updateLocalStorage(); // update lai du lieu
    // console.log(this.todos);
  }
  ngOnInit() {
    this.fetchFromLocalStorage();
  }
  changeTodoStatus(id: number, isCompleted: boolean) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    const todoTemp = this.todos[index];
    todoTemp.isCompleted = isCompleted;
    this.todos.splice(index, 1, todoTemp); // xoa 1 phan tu va thay the bang phan tu mo
    this.updateLocalStorage();
  }
  changeTodoContent(id: number, content: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    const todoTemp = this.todos[index];
    todoTemp.content = content;
    this.todos.splice(index, 1, todoTemp); // xoa 1 phan tu va thay the bang phan tu moi
    this.updateLocalStorage();
  }
  deleteTodo(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(index, 1); // xoa 1 phan tu va thay the bang phan tu moi
    this.updateLocalStorage();
  }
  toggleAll() {
    this.todos = this.todos.map((todo) => {
      return { ...todo, isCompleted: !this.todos.every((t) => t.isCompleted) }; // neu ko co cai nafo isCompleted thi bat, nguoc lai, neu 1 false 1 true thi true all
      //{...todo, isCompleted } se tao 1 mang nhung modify isCOmpleted
    });
    this.updateLocalStorage();
  }
  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.isCompleted);
    this.updateLocalStorage();
  }
}
