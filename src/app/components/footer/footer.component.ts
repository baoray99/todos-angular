import { Component, OnInit, OnDestroy } from '@angular/core';
import { Filter, FilterButton } from 'src/app/models/filtering.model';
import { Observable, Subject } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  filterButton: FilterButton[] = [
    { type: Filter.All, label: 'All', isActive: true }, // de reload trang thi luon bat ben All
    { type: Filter.Active, label: 'Active', isActive: false },
    { type: Filter.Completed, label: 'Completed', isActive: false },
  ];
  length = 0;
  hasCompleted$: Observable<boolean>;
  destoy$: Subject<null> = new Subject<null>();
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.hasCompleted$ = this.todoService.todos$.pipe(
      map((todos) => todos.some((t) => t.isCompleted)), // some se tra ve mang neu co it nhat 1 phan tu thoa man dk
      takeUntil(this.destoy$)
    );
    this.todoService.length$
      .pipe(takeUntil(this.destoy$))
      .subscribe((length) => (this.length = length));
  }
  filtered(type: Filter) {
    this.setActiveBtn(type);
    this.todoService.filterTodos(type);
  }
  private setActiveBtn(type: Filter) {
    this.filterButton.forEach((btn) => (btn.isActive = btn.type === type));
  }
  clearCompleted(){
    this.todoService.clearCompleted();
  }
  ngOnDestroy(): void {
    this.destoy$.next();
    this.destoy$.complete();
    // 1 cach unsubcribe observable
  }
}
