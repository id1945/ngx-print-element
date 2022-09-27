import { NgModule } from '@angular/core';
import { NgxPrintElementComponent } from './ngx-print-element.component';
import { NgxPrintElementDirective } from './ngx-print-element.directive';


@NgModule({
  declarations: [
    NgxPrintElementComponent,
    NgxPrintElementDirective
  ],
  exports: [
    NgxPrintElementComponent,
    NgxPrintElementDirective
  ]
})
export class NgxPrintElementModule { }
