import { Component, OnInit } from '@angular/core';
import { DataBridgeService } from 'src/app/services/data-bridge.service';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.css'],
})
export class Child2Component implements OnInit {
  constructor(private _dataBridgeService: DataBridgeService) {}
  textFromChild: string;
  ngOnInit(): void {
    this._dataBridgeService.textFromChild$.subscribe(
      (text) => (this.textFromChild = text)
      //phai subscribe thi moi nhan data
    );
  }
}
