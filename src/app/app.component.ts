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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent
  implements
    OnInit,
    OnChanges,
    OnDestroy,
    AfterViewInit,
    AfterContentInit,
    AfterViewChecked,
    AfterContentChecked {
  title = 'todolist';
  textColor = 'red';
  container = true;

  toggleBorder() {
    this.container = !this.container;
    this.title = 'Changed';
  }
  receiveFromChild(event) {
    console.log({ event }, 'from child');
    this.title = event;
    //data from child is here
  }
  onMouseOn() {
    this.textColor = 'orange';
  }
  onMouseOut() {
    this.textColor = 'blue';
  }

  ngOnInit(): void {
    console.log('Parent OnInit ran');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Parent OnChanges ran', { changes });
  }
  ngOnDestroy(): void {
    console.log('Parent OnDestroy ran');
  }
  ngAfterViewInit(): void {
    console.log('Parent AfterView ran');
  }
  ngAfterContentInit(): void {
    console.log('Parent AfterContent ran');
  }
  ngAfterViewChecked(): void {
    console.log('Parent AfterView Cheked');
  }
  ngAfterContentChecked(): void {
    console.log('Parent AfterContent Checked');
  }
}
