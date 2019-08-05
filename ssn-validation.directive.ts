import { Directive, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appValidationSsn]',
})
export class ValidationSsnDirective {
    @Input() ssnLabel = {
        label: 'SSN/ITIN',
    };

    constructor(private ngControl: NgControl) { }

    @HostListener('blur')
    onBlur() {
        this.validateSSN();
    }

    @HostListener('keydown', ['$event'])
    onkeydown(event) {
        const keyCode = event.which || event.keyCode;
        const shiftKey = event.shiftKey;

        if (!this.isValidKeyCodeForSSN(keyCode, shiftKey)) {
            event.preventDefault();
        }
    }

    @HostListener('ngModelChange')
    onModelChange() {
        const value = this.ngControl.control.value;

        if (!value || value.match(/^[*]/)) {
            this.ssnLabel.label = 'SSN/ITIN';
        } else if (value.match(/^[^9]/)) {
            this.ssnLabel.label = 'SSN';
        } else {
            this.ssnLabel.label = 'ITIN';
        }
    }

    private validateSSN() {
        const name = this.ngControl.name;
        const value = this.ngControl.control.value;

        if (!value) {
            return;
        }

        if (value.length === 11 && value.match(/^[*]/)) {
            return;
        }

        if (value.match(/^[0-9]{9}$/)) {
            // 9 digits ssn
            const ssn = this.insertHyphen(value);
            this.ngControl.control.setValue(ssn);
        } else if (value.match(/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/)) {
            // 11 digits ssn, with hyphen, do nothing
        }
    }

    private insertHyphen(value: string): string {
        return (
            value.substring(0, 3) +
            '-' +
            value.substring(3, 5) +
            '-' +
            value.substring(5, 9)
        );
    }

    private isValidKeyCodeForSSN(keyCode: number, shiftKey: boolean): boolean {
        return (
            (keyCode === 8 || // backspace
                keyCode === 9 || // tab
                keyCode === 46 || // delete
                keyCode === 189 || // hyphen
                (keyCode >= 48 && keyCode <= 57) || // numbers
                (keyCode >= 96 && keyCode <= 105)) && // num pad
            !shiftKey // not combination with shift key
        ); 
    }
}
