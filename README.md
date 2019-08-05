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
  




## Capitalization directive



> Capitalize the first letter and letter after special character.


> Input only accept characters, hyphen, single quote and space. 


### Example


``` abc => Abc ```


``` abc-abc => Abc-Abc ```


``` abc abc => Abc Abc ```


``` abc'abc => Abc'Abc ```



### How to use

1. Add the appCapitalization attribute to an input element.

```html
     <input type="text" appCapitalization />
  ```



## SSN validation directive

> Validate SSN format after user entered value (###-##-####).

> SSN/ITIN must be 9 digits in length or 11 digits ssn, with 2 hyphens.

> Only numbers and hyphen are acceptable.

> Recognize input that is entered by the user as ITIN vs SSN.

> If input is empty, then label should read SSN/ITIN

> If input first (left-most) character is NOT EQUAL to 9, then label should read SSN.

> If input first (left-most) character is EQUAL to 9, then label should read ITIN.

> If characters are all masked except for the last 4 digits, i.e., ***-**-3211, so the label should read SSN/ITIN. 

### Example


``` 123456789 => 123-45-6789```


``` 123-45-6789 => 123-45-6789```



### How to use

1. Add the appValidationSsn attribute to an input element.

```html
     <input type="text" appValidationSsn />
  ```
  
