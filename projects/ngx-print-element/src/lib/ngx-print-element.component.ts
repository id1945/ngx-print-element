import { Component } from '@angular/core';
import { Config, NgxPrintElementService } from './ngx-print-element.service';

@Component({
  selector: 'ngx-print-element',
  template: `<ng-content></ng-content>`,
  exportAs: 'element'
})
export class NgxPrintElementComponent {

  constructor(private prints: NgxPrintElementService) { }

  /**
   * print
   * @param id 
   * @param config 
   */
  public print(id: string, config?: Config): void {
    this.prints.print(id, config);
  }
}
