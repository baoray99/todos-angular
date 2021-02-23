import {
  Input,
  OnInit,
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { DataBridgeService } from 'src/app/services/data-bridge.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent
  implements
    OnInit,
    OnChanges,
    OnDestroy,
    AfterViewInit,
    AfterContentInit,
    AfterViewChecked,
    AfterContentChecked {
  @Input() text: string;
  @Output() btnClicked: EventEmitter<any> = new EventEmitter<any>();
  //dung any de khoi phai parse
  constructor(private _dataBrideService :DataBridgeService) {}

  btnChildClicked() {
    this.text = 'Changed from child and pass to parent';
    this.btnClicked.emit(this.text); // truyen gia tri len parent trong emit()
    this._dataBrideService.setTextFromChild(this.text)
  }
  ngOnInit(): void {
    console.log('Child OnInit ran');
    this._dataBrideService.setTextFromChild(this.text)
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Child OnChanges ran', { changes });
  }
  ngOnDestroy(): void {
    console.log('Child OnDestroy ran');
  }
  ngAfterViewInit(): void {
    console.log('Child AfterView ran');
  }
  ngAfterContentInit(): void {
    console.log('Child AfterContent ran');
  }
  ngAfterViewChecked(): void {
    console.log('Child AfterView Cheked');
  }
  ngAfterContentChecked(): void {
    console.log('Child AfterContent Checked');
  }
}
