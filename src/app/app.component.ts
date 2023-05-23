import { Component } from '@angular/core';
import { NgxPrintElementService } from 'ngx-print-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public print: NgxPrintElementService) {}

  public config = {
    printMode: 'template', // template
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Hello World',
    templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['td { border: 1px solid black; color: green; }', 'table { border: 1px solid black; color: red }', 'header, table, footer { margin: auto; text-align: center; }']
  }

  onPrint1(id: string) {
    this.print.print(id).subscribe(console.log)
  }

  onPrint2(id: string) {
    this.print.print(id, this.config).subscribe(console.log)
  }

  onPrint3(id: string) {
    this.print.print(id, { ...this.config, printMode: 'template' }).subscribe(console.log)
  }
}