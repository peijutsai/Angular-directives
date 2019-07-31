import {
  Directive,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumberOnly]',
})
export class NumberOnlyDirective {
  @Input() allowNegative: boolean = false;
  @Input() allowDecimal: boolean = false;
  @Input() min = null;
  @Input() max = null;
  @Output('onNumberOnlyCallback') onNumberOnlyCallbackEmitter: EventEmitter<
    NumberOnlyCallback
  > = new EventEmitter();

  constructor(private ngControl: NgControl) { }

  @HostListener('keydown', ['$event'])
  onkeydown(event) {
    const keyCode = event.which || event.keyCode;
    const shiftKey = event.shiftKey;

    if (!this.isValidKeyCode(keyCode, shiftKey)) {
      event.preventDefault();
    }
  }

  @HostListener('focus') onFocus() {
    this.onNumberOnlyCallbackEmitter.emit({
      isValid: true,
      fieldName: this.ngControl.name
    });
  }

  @HostListener('blur') onBlur() {
    if (this.min === null || this.max === null) {
      return;
    }

    const valueStr = this.ngControl.control.value;
    const valueNum = parseFloat(valueStr);
    const minNum = parseFloat(this.min);
    const maxNum = parseFloat(this.max);

    let callback = {
      isValid: true,
      fieldName: this.ngControl.name,
      min: minNum,
      max: maxNum,
    }

    if (valueNum < minNum || valueNum > maxNum) {
      callback.isValid = false
    }

    this.onNumberOnlyCallbackEmitter.emit(callback);
  }

  private isValidKeyCode(keyCode: number, shiftKey: boolean): boolean {
    const value: string = this.ngControl.control.value;
    if (
      this.allowNegative &&
      (keyCode === 109 || keyCode === 110 || keyCode === 189) &&
      !value.includes('-')
    ) {
      return true;
    }

    if (this.allowDecimal && keyCode === 190 && !value.includes('.')) {
      return true;
    }

    return (
      (keyCode === 8 || // backspace
        keyCode === 9 || // tab
        keyCode === 46 || // delete
        (keyCode >= 37 && keyCode <= 40) || // arrows
        (keyCode >= 48 && keyCode <= 57) || // numbers
        (keyCode >= 96 && keyCode <= 105)) && // num pad
      !shiftKey
    );
  }
}

export interface NumberOnlyCallback {
  isValid: boolean
  fieldName: string;
  min?: number;
  max?: number;
}
