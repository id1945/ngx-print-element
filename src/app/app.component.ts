import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgxPrintElementService, Config } from 'ngx-print-element';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'app';
  public date = new Date();

  @ViewChild('tableRef') tableElement!: ElementRef<HTMLTableElement>;
  @ViewChild('modalRef') modalElement!: ElementRef<HTMLElement>;

  constructor(public print: NgxPrintElementService) {}

  public config: Config = {
    printMode: 'template', // template-popup
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Hello World',
    // htmlType: 'text',
    templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: [
      'header, footer{ text-align: center; }',
      'body .bg-success{ background-color: #4dcf83 !important; }',
      'body .bg-danger{ background-color: #f96868 !important; }',
    ]
  }

  onPrint1(el: ElementRef<HTMLTableElement | HTMLElement>) {
    this.print.print(el).subscribe(console.log)
  }

  onPrint2(el: ElementRef<HTMLTableElement | HTMLElement>) {
    this.print.print(el, this.config).subscribe(console.log)
  }

  onPrint3(el: ElementRef<HTMLTableElement | HTMLElement>) {
    this.print.print(el, { ...this.config, printMode: 'template-popup' }).subscribe(console.log)
  }
}
