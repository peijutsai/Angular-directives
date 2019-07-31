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
  




## Capitalization 



> Capitalize the first letter and letter after special character.


> Input only accept characters, hyphen, single quote and space. 





``` abc => Abc ```


``` abc-abc => Abc-Abc ```


``` abc abc => Abc Abc ```


``` abc'abc => Abc'Abc ```



### How to use

1. Add the appCapitalization attribute to an input element.

```html
     <input type="text" appCapitalization />
  ```



  
