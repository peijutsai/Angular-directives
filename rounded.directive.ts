import { Directive, HostListener, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appRounded]',
})
export class RoundedDirective implements OnInit {
    // Round to 3 decimal by default
    @Input() decimal = 3;
    @Input() inPercentage: boolean = false;

    private hasFocus = false;
    private hasSetRoundedValue = false;

    constructor(private ngControl: NgControl) { }

    ngOnInit() {
        this.round();
    }

    @HostListener('focus') onfocus() {
        this.hasFocus = true;
    }

    @HostListener('blur') onBlur() {
        this.round();
        this.hasFocus = false;
    }

    @HostListener('ngModelChange') onModelChange() {
        if (this.hasFocus) {
            return;
        }

        if (this.hasSetRoundedValue) {
            // Prevent from infinite loop
            this.hasSetRoundedValue = false;
            return;
        }

        /*
          We only want to round the value when the input loses it's focus.
          However, when the value is being patched in (by form.setValue() for example), onBlur would not
          be triggered so we need to round it here.
        */
        this.round();
    }

    private round = () => {
        const valueStr = this.ngControl.control.value;

        if (!valueStr) {
            // Empty value
            return;
        }

        const value = parseFloat(valueStr);
        if (!value) {
            // Not a number
            return;
        }

        let roundedValue = value.toFixed(this.decimal);
        if (this.inPercentage) {
            roundedValue += '%';
        }

        this.hasSetRoundedValue = true;
        this.ngControl.control.setValue(roundedValue);
    };
}
