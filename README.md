# ngx-print-element

This library is built to provide a solution for printing on html elements.\
This is the [Github](https://id1945.github.io/ngx-print-element), [Stackblitz](https://stackblitz.com/edit/angular-ngx-print-element) .

![Logo](https://raw.githubusercontent.com/id1945/ngx-print-element/master/ngx-print-element.png)

## Installation
Install `ngx-print-element` from `npm`:
```bash
npm install ngx-print-element@<version> --save
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

Printing data sheet with id is up to you.\
If there is an element you don't want to display you can add the class ```print-none```

```html
<table #tableRef ngxPrintElement>
  <tr>
    <th>No</th>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>01</td>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td class="bg-success">02</td>
    <td class="bg-success">Centro comercial Moctezuma</td>
    <td class="bg-success">Francisco Chang</td>
    <td class="bg-success">Mexico</td>
  </tr>
  <tr>
    <td>03</td>
    <td>AIS Playground</td>
    <td>Nakhon Pathom</td>
    <td>Thailand</td>
  </tr>
  <tr class="print-none"> <!-- No print -->
    <td class="bg-danger">04</td>
    <td class="bg-danger">FPT Software</td>
    <td class="bg-danger">Cau Giay</td>
    <td class="bg-danger">Vietnamese</td>
  </tr>
</table>
```

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgxPrintElementService } from 'ngx-print-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('tableRef') tableElement: ElementRef<HTMLTableElement>;

  public config: Config = {
    printMode: 'template', // template-popup
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Hello World',
    templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: [
      'header, footer{ text-align: center; }',
      'body .bg-success{ background-color: #4dcf83 !important; }',
      'body .bg-danger{ background-color: #f96868 !important; }',
    ]
  }

  constructor(public print: NgxPrintElementService) {}

  onPrint1(el: ElementRef<HTMLTableElement>) {
    this.print.print(el).subscribe(console.log);
  }

  onPrint2(el: ElementRef<HTMLTableElement>) {
    this.print.print(el, this.config).subscribe(console.log);
  }

  onPrint3(el: ElementRef<HTMLTableElement>) {
    this.print.print(el, { ...this.config, printMode: 'template-popup' }).subscribe(console.log);
  }
}
```

```html
<!-- default -->
<ngx-print-element #element="element">
  <button (click)="element?.print(tableElement)">Print default</button>
</ngx-print-element>
<!-- default -->
<button (click)="onPrint1(tableElement)">Print default</button>
<!-- iframe -->
<button (click)="onPrint2(tableElement)">Template iframe</button>
<!-- window.open -->
<button (click)="onPrint3(tableElement)">Template new window</button>
```

#### API Documentation

| Field | Description | Type | Default |
| --- | --- | --- | --- |
| htmlType | `domObj`,`text` | string | `'domObj'` |
| printMode | `template`,`template-popup` | string | `template` |
| popupProperties | Options [window.open](https://www.w3schools.com/jsref/met_win_open.asp) | string | blank |
| pageTitle | Print title | string | blank |
| templateString | html | string | blank |
| stylesheets | Set the external style sheet for printing | object or object[] | null |
| styles | Set the internal style sheet for printing | string or string[] | null |


#### Support versions
  
<table>
  <tr>
    <th colspan="2">Support versions</th>
  </tr>
  <tr>
    <td>Angular 16</td>
    <td>2.1.4</td>
  </tr>
  <tr>
    <td>Angular 6</td>
    <td>2.1.3</td>
  </tr>
</table>

#### Author Information

<table>
  <tr>
    <th colspan="2">Author Information</th>
  </tr>
  <tr>
    <td>Author</td>
    <td>DaiDH</td>
  </tr>
  <tr>
    <td>Phone</td>
    <td>+84845882882</td>
  </tr>
  <tr>
    <td>Country</td>
    <td>Vietnam</td>
  </tr>
</table>

#### To make this library more complete, please donate to me if you can!

<table>
  <tr>
    <th>Bitcoin</th>
    <th>Paypal</th>
    <th>MbBank</th>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/id1945/id1945/master/donate-bitcoin.png" width="182px"></td>
    <td><img src="https://raw.githubusercontent.com/id1945/id1945/master/donate-paypal.png" width="182px"></td>
    <td><img src="https://raw.githubusercontent.com/id1945/id1945/master/donate-mbbank.png" width="182px"></td>
  </tr>
</table>

![Vietnam](https://raw.githubusercontent.com/id1945/id1945/master/vietnam.gif)

[MIT License](https://github.com/id1945/ngx-print-element/blob/master/LICENSE). Copyright (c) 2022 DaiDH
