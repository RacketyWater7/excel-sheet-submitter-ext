/**
 * Simulates a click event on an element.
 * @param {HTMLElement} element
 */
export function simulateClick(element) {
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  const mousedownEvent = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  const mouseupEvent = new MouseEvent('mouseup', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  element.dispatchEvent(mousedownEvent);
  element.dispatchEvent(mouseupEvent);
  element.dispatchEvent(clickEvent);
}
