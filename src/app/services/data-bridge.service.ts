import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataBridgeService {
  private _textFromChildSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  constructor() {}
  //observable la kieu theo doi data
  //behavior có thể lấy được giá trị cúi cùng
  textFromChild$: Observable<string> = this._textFromChildSubject.asObservable();
  // tao doi tuong theo doi data text
  setTextFromChild(text: string) {
    this._textFromChildSubject.next(text);
  }
}
