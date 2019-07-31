# Angular-directives

> Several common angular directives.


## Number Only directive

### How to use

1. Add the appNumberOnly attribute to an input element.

```html
     <input type="text" appNumberOnly />
  ```

2. Determine if allow negative number or decimal.

```html
     <input type="text" appNumberOnly [allowDecimal]="true" [allowNegative]="true"/>
  ```
  
3. Can pass min and max numbers to determin if the number is valid or not

```html
     <input type="text" appNumberOnly [max]="4" [min]="1"/>
  ```

4. Can pass callback function to notify parent component if the number is valid or not

```html
     <input type="text" appNumberOnly (onNumberOnlyCallback)="onNumberOnlyCallback($event)"/>
  ```
  
