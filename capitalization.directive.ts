import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appCapitalization]',
})
export class CapitalizationDirective {
    constructor(private ngControl: NgControl) { }

    @HostListener('blur')
    onBlur() {
        this.capitalization();
    }

    @HostListener('keydown', ['$event'])
    onkeydown(event) {
        const keyCode = event.which || event.keyCode;
        const shiftKey = event.shiftKey;

        if (!this.isValidKeyCode(keyCode, shiftKey)) {
            event.preventDefault();
        }
    }

    private capitalization = () => {
        let value = this.ngControl.control.value;
        let seprateStrby: string;
        let formattedValue: string;
        let arr = [];
        let tempArr = [];

        if (value === '' || !isNaN(value)) {
            return;
        }

        if (!value.includes('-') && !value.includes("'") && !value.includes(' ')) {
            formattedValue = this.capitalizeFirstLetter(value);

            this.ngControl.control.setValue(formattedValue);

            return;
        }

        if (value.includes('-')) {
            seprateStrby = '-';
        } else if (value.includes("'")) {
            seprateStrby = "'";
        } else {
            seprateStrby = ' ';
        }

        arr = value.split(seprateStrby);

        arr.forEach(element => {
            let capitalizedEle = this.capitalizeFirstLetter(element);
            tempArr.push(capitalizedEle);
        });

        formattedValue = tempArr.join(seprateStrby);

        this.ngControl.control.setValue(formattedValue);
    };

    private capitalizeFirstLetter = (input: string): string => {
        let inputArr = input.split('');
        let firstLetter = inputArr[0].toUpperCase();
        inputArr.splice(0, 1, firstLetter);
        let capitalizedValue = inputArr.join('');

        return capitalizedValue;
    };

    private isValidKeyCode(keyCode: number, shiftKey: boolean): boolean {
        return (
            keyCode === 8 || // backspace
            keyCode === 9 || // tab
            keyCode === 32 || //space
            keyCode === 46 || // delete
            (keyCode === 189 && !shiftKey) || // hyphen
            (keyCode === 222 && !shiftKey) || // single quote
            !(
                (keyCode >= 48 && keyCode <= 57) || // numbers
                (keyCode >= 96 && keyCode <= 105)
            )
        );
    }
}
