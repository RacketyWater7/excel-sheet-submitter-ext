/**
 * @param {Array} group
 * @param {string} searchText
 * @returns {Element}
 */
export default function selectBestMatchGroupCheckbox(group, searchText) {
  const searchWords = searchText.toLowerCase().split(/[\s,()\[\]-]+/);
  let bestMatch = null;
  let bestScore = 0;
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
