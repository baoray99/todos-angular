import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // OnChanges,
  // OnDestroy,
  // AfterViewInit,
  // AfterContentInit,
  // AfterViewChecked,
  // AfterContentChecked {
  // title = 'todolist';
  // textColor = 'red';
  // container = true;

  // toggleBorder() {
  //   this.container = !this.container;
  //   this.title = 'Changed';
  // }
  // receiveFromChild(event) {
  //   console.log({ event }, 'from child');
  //   this.title = event;
  //   //data from child is here
  // }
  // onMouseOn() {
  //   this.textColor = 'orange';
  // }
  // onMouseOut() {
  //   this.textColor = 'blue';
  // }
  hasTodos$: Observable<boolean>; //check xem co todo ko de hien footer
  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.todoService.fetchFromLocalStorage();
    this.hasTodos$ = this.todoService.length$.pipe(map((length) => length > 0)); // dung pipe de xu ly du lieu, dung map khai bao lenght de tra ve kieu boolean cho hasTodos, nen khai bao map from rxjs.operators
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('Parent OnChanges ran', { changes });
  // }
  // ngOnDestroy(): void {
  //   console.log('Parent OnDestroy ran');
  // }
  // ngAfterViewInit(): void {
  //   console.log('Parent AfterView ran');
  // }
  // ngAfterContentInit(): void {
  //   console.log('Parent AfterContent ran');
  // }
  // ngAfterViewChecked(): void {
  //   console.log('Parent AfterView Cheked');
  // }
  // ngAfterContentChecked(): void {
  //   console.log('Parent AfterContent Checked');
  // }
}
