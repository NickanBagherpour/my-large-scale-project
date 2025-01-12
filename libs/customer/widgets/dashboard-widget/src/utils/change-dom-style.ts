export function injectStyle(iframe, css) {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const style = iframeDoc.createElement('style');
  style.textContent = css;
  iframeDoc.head.appendChild(style);
}

export function changeIframeElementStyle(iframe, selector, styles) {
  console.log('iframe', iframe);
  // const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
  // console.log('iframeDoc','sel',iframeDoc,selector);
  // const element = iframeDoc.querySelector('div');
  // console.log('element',element);
  // if (element) {
  //   Object.assign(element.style, styles);
  // }
}

export function addCssVar(document, variable, value) {
  document.documentElement.style.setProperty(variable, value);
}
