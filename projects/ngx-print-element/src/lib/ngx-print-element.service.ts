import { Injectable } from '@angular/core';
import { printHtml } from './ngx-print-element.helper';

export interface Config {
  htmlType?: string;
  printMode?: string;
  pageTitle?: string;
  templateString?: string;
  popupProperties?: string;
  stylesheets?: string;
  styles?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NgxPrintElementService {

  constructor() { }

  /**
   * Print
   * @param id 
   * @param config 
   * @returns 
   */
  public print(id: string, config?: Config): void {
    // Create and insert new print section
    const container = document.getElementById(id);
    switch (config && config.printMode) {
      case 'template':
        printHtml(container, { ...config, printMode: '' });
        break;
      case 'template-popup':
        printHtml(container, { ...config, printMode: 'popup' });
        break;
      default:
        if (container) {
          // Declare
          const domClone = container.cloneNode(true);
          const $printSection = document.createElement('div');
          // Add visibility hidden into body
          const bodyEl = document.querySelector('body');
          if (bodyEl) {
            bodyEl.setAttribute('style', 'visibility: hidden !important;');
          }
          // Clone element container
          $printSection.id = 'ngx-print-element';
          $printSection.appendChild(domClone);
          document.body.insertBefore($printSection, document.body.firstChild);
          // Print
          window.print();
          // Clean up print section for future use
          const oldElem = document.getElementById('ngx-print-element');
          if (oldElem) {
            oldElem.parentNode.removeChild(oldElem);
          }
          oldElem.remove();
          // Clear visibility: hidden
          bodyEl && (bodyEl.style.visibility = '');
        }
        break;
    }
  }
}
