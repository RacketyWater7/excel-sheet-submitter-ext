/**
 *
 * @param {HTMLSelectElement} selectElement
 * @param {string} searchText
 */
export default function selectBestMatch(selectElement, searchText) {
  const options = Array.from(selectElement.querySelectorAll('option'));

  // Break down search text into individual words
  const searchWords = searchText.toLowerCase().split(/[\s,()\[\]-]+/);
  let bestMatch = null;
  let bestScore = 0;

  for (const option of options) {
    const optionText = option.textContent.toLowerCase();

    let score = 0;
    for (const searchWord of searchWords) {
      if (optionText.includes(searchWord)) {
        score++;
      }
    }

    if (score > bestScore) {
      bestMatch = option;
      bestScore = score;
    }
  }

  if (bestMatch) {
    bestMatch.selected = true;
  }
}
