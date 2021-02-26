import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  animations: [
    trigger('fadeStrikeThrough', [
      state(
        'active',
        style({
          fontSize: '18px',
          color: 'black',
        })
      ),
      state(
        'completed',
        style({
          fontSize: '17px',
          color: 'lightgrey',
          textDecoration: 'line-through',
        })
      ),
      transition('active <=> completed', [animate(250)]),
    ]),
  ],
})
export class TodoItemComponent implements OnInit {
  isHoverd: boolean = false;
  isEditting: boolean = false;
  @Input() todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTd: EventEmitter<Todo> = new EventEmitter<Todo>();
  constructor() {}

  ngOnInit(): void {}
  submitEdited(keyboard: KeyboardEvent) {
    const { keyCode } = keyboard;
    keyboard.preventDefault(); // ko cho submit default ma tu minh submit
    if (keyCode === 13) {
      this.editTodo.emit(this.todo);
      this.isEditting = false;
    }
  }
  changeTodoStatus() {
    this.changeStatus.emit({
      ...this.todo,
      isCompleted: !this.todo.isCompleted,
    });
  }
  deleteTodo() {
    this.deleteTd.emit(this.todo.id);
  }
}
