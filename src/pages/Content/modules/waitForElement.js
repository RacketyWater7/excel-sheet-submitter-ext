/**
 * @param {string} selector
 * @param {number} timeout
 * @returns {Promise<Element>}
 */
export default async function waitForElement(selector, timeout = 30000) {
  // time is
  return new Promise((resolve, reject) => {
    const endTime = Date.now() + timeout;
    const check = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else if (Date.now() < endTime) {
        setTimeout(check, 100);
      } else {
        reject(new Error(`Timeout waiting for element: ${selector}`));
      }
    };
    check();
  });
}
