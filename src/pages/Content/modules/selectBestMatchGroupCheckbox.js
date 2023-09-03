/**
 * @param {Array} group
 * @param {string} searchText
 * @returns {Element}
 */
export default function selectBestMatchGroupCheckbox(group, searchText) {
  console.info('Selecting best match:', searchText);
  // const options = Array.from(selectElement.querySelectorAll('option'));

  // Break down search text into individual words
  // const searchWords = searchText.toLowerCase().split(/\s+/); // to remove the comma also, then use split(/[\s,]+/)
  const searchWords = searchText.toLowerCase().split(/[\s,()\[\]-]+/);
  let bestMatch = null;
  let bestScore = 0;

  console.info('group:', group);
  for (const element of group) {
    const elementText = element.textContent.toLowerCase();

    let score = 0;
    for (const searchWord of searchWords) {
      if (elementText.includes(searchWord)) {
        score++;
      }
    }

    if (score > bestScore) {
      bestMatch = element;
      bestScore = score;
    }
  }

  if (bestMatch) {
    bestMatch.childNodes[0].checked = true;
  }
}
