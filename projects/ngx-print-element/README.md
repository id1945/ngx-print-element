# ngx-print-element

This library is built to provide a solution for printing on html elements.\
This is the [demo](https://stackblitz.com/edit/angular-ngx-print-element?file=src/app/app.component.ts).

![Logo](https://raw.githubusercontent.com/id1945/ngx-print-element/master/ngx-print-element.png)

## Installation
Install `ngx-print-element` from `npm`:
```bash
npm install ngx-print-element --save
```
Support Version
```bash
Angular 12: npm install ngx-print-element@2.0.5 --save
Angular 8: npm install ngx-print-element@2.0.4 --save
```

Add wanted package to NgModule imports:
```typescript
import { NgxPrintElementModule } from 'ngx-print-element';
@NgModule({
    imports: [
        NgxPrintElementModule,
    ]
})
```
Need to import css
```scss
@import '~ngx-print-element/styles.css';
```
Printing data sheet with id is up to you.\
If somewhere you don't want to display you can use class print-none

## 1# The first way doesn't need configuration
```html
<table id="demo">
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr class="print-none">
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>

<ngx-print-element #element="element">
  <button (click)="element.print('demo')">Print</button>
</ngx-print-element>
```

## 2# The second way needs configuration
```html
<table id="demo">
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr class="print-none">
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>
```
```html
<ngx-print-element #element="element">
  <button (click)="element.print('demo', {printMode: 'template', pageTitle: 'Hello World'})">Print</button>
</ngx-print-element>
```
#### Services
```typescript
import { Component } from '@angular/core';
import { NgxPrintElementService } from 'ngx-print-element';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public print: NgxPrintElementService) {}
}
```
```html
<p id="demo">Angular-Print</p>
<button (click)="print.print('demo')">Print</button>
```

#### API Documentation

| Field | Description | Type | Default |
| --- | --- | --- | --- |
| htmlType | Set element type(`'domObj'`,`'text'`) | string | `'domObj'` |
| printMode | Way of printing | string(`'template'`,`'template-popup'`) | - |
| pageTitle | Print title | string | - |
| templateString | Print template | - | - |
| popupProperties | Set the new `window.open` parameters | string | -|
| stylesheets | Set the external style sheet for printing | - | - |
| styles | Set the internal style sheet for printing | - | - |

Author: `DaiDH`, Tel: `0845882882`

### License

[MIT License](https://github.com/id1945/ngx-print-element/blob/master/LICENSE). Copyright (c) 2021 DaiDH