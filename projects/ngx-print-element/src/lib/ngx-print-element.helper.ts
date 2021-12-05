export const callPrint = (printWindow: any, iframe: any) => {
  if (printWindow && printWindow.printPage) {
    printWindow.printPage();
    if (iframe) {
      document.body.removeChild(iframe);
    }
  } else {
    setTimeout(() => {
      callPrint(printWindow, iframe);
    }, 50);
  }
};

export const getBaseHref = () => {
  const port = (window.location.port) ? `:${window.location.port}` : '';
  return `${window.location.protocol}//${window.location.hostname}${port}${window.location.pathname}`;
};

export const getMarkup = (elementHtml: any, options: any) => {
  const template = options.templateString;
  const templateRegex = new RegExp(/{{\s*printBody\s*}}/gi);
  let stylesheets;
  let styles;
  const html = [];

  if (template && templateRegex.test(template)) {
    elementHtml = template.replace(templateRegex, elementHtml);
  }

  html.push(`<html><head><title>${options.pageTitle || ''}</title>`);

  // If stylesheet URL's or list of stylesheet URL's are specified, override page stylesheets
  if (options.stylesheets) {
    stylesheets = Array.isArray(options.stylesheets) ? options.stylesheets : [options.stylesheets];
  } else {
    stylesheets = Array.prototype.slice
      .call(document.getElementsByTagName('link'))
      .map(link => link.href);
  }

  stylesheets.forEach((href: any) => {
    html.push(`<link rel="stylesheet" href="${href}">`);
  });

  // If inline styles or list of inline styles are specified, override inline styles
  if (options.styles) {
    styles = Array.isArray(options.styles) ? options.styles : [options.styles];
  } else {
    styles = Array.prototype.slice
      .call(document.getElementsByTagName('style'))
      .map(style => style.innerHTML);
  }

  styles.forEach((style: any) => {
    html.push(`<style type="text/css">${style}</style>`);
  });

  html.push(`<base href="${getBaseHref()}"/>`);
  html.push('</head><body class="pe-body">');
  html.push(elementHtml);
  html.push(`
    <script type="text/javascript">
      function printPage() {
        focus();
        print();
        ${options.printMode.toLowerCase() === 'popup' ? 'close();' : ''}
      }
    </script>
  `);
  html.push('</body></html>');

  return html.join('');
};

export const printHtml = (element: any, selfOptions = {}) => {
  const defaultOptions = {
    htmlType: 'domObj',
    printMode: '',
    pageTitle: '',
    templateString: '',
    popupProperties: '',
    stylesheets: null,
    styles: null
  };
  const options = { ...defaultOptions, ...selfOptions };
  let html = element;
  if (options.htmlType === 'domObj') {
    html = element.outerHTML;
  }

  // Get markup to be printed
  const markup = getMarkup(html, options);
  let printWindow;
  let printIframe;
  let printDocument: any;
  let printElementID;

  if (options.printMode.toLowerCase() === 'popup') {
    printWindow = window.open('about:blank', 'printElementWindow', options.popupProperties);
    printDocument = printWindow.document;
  } else {
    printElementID = `printElement_${(Math.round(Math.random() * 99999)).toString()}`;

    printIframe = document.createElement('iframe');
    printIframe.setAttribute('id', printElementID);
    printIframe.setAttribute('src', 'about:blank');
    printIframe.setAttribute('frameBorder', '0');
    printIframe.setAttribute('scrolling', 'no');
    printIframe.setAttribute('style', 'position:fixed;bottom:100%;right:100%;');

    document.body.appendChild(printIframe);

    printDocument = (printIframe.contentWindow || printIframe.contentDocument);
    if (printDocument.document) {
      printDocument = printDocument.document;
    }

    printIframe = (document as any).frames ? (document as any).frames[printElementID] : document.getElementById(printElementID);
    printWindow = printIframe.contentWindow || printIframe;
  }

  focus();
  printDocument.open();

  // SetTimeout fixesiframe printMode does not work in firefox
  setTimeout(() => {
    printDocument.write(markup);
    printDocument.close();
  });

  callPrint(printWindow, printIframe);
};
