import { simulateClick } from './simulateClick';

/**
 * Selects an item in a dynamic dropdown.
 * @param {string} itemText - The text of the item to select.
 */
export function selectItemInDynamicDropdown(itemText) {
  // Find the span element by its ID
  const selectContainer = document.querySelector(
    '#select2-Attendings-container'
  );

  // Simulate a click to open the dropdown
  simulateClick(selectContainer);

  // Wait for a brief moment for the dropdown to open
  setTimeout(() => {
    // Find the ul element by its ID
    const dropdownList = document.querySelector('#select2-Attendings-results');
    const searchWords = itemText.toLowerCase().split(/[\s,()\[\]-]+/);
    let bestMatch = null;
    let bestScore = 0;
    // Find the li element that contains the desired itemText
    const listItems = Array.from(dropdownList.querySelectorAll('li'));

    listItems.forEach((li) => {
      let score = 0;
      const liText = li.textContent.toLowerCase();
      for (const searchWord of searchWords) {
        if (liText.includes(searchWord)) {
          score++;
        }
      }
      if (score > bestScore) {
        bestMatch = li;
        bestScore = score;
      }
    });

    // If the listItem exists, simulate a click to select it
    if (bestMatch) {
      simulateClick(bestMatch);
    }
  }, 1000); // Adjust the timeout as needed
}
