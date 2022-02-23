import { Directive, HostListener, Input } from '@angular/core';
import { NgxPrintElementService } from './ngx-print-element.service';

@Directive({
  selector: '[print]'
})
export class NgxPrintElementDirective {
  @Input() print: any[];

  constructor(private prints: NgxPrintElementService) { }

  /**
   * Print
   * @param event 
   */
  @HostListener('click', ['$event']) onClick(event) {
    if (this.print && this.print.length === 1) {
      this.prints.print(this.print[0]);
    }
    if (this.print && this.print.length === 2) {
      this.prints.print(this.print[0], this.print[1]);
    }
  }
}
