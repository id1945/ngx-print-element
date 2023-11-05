import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxPrintElementModule } from 'ngx-print-element';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPrintElementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }