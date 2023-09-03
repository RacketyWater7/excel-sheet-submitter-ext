// import calculateWordMatchingScore from './calculateWordMatchingScore';

// /**
//  *
//  * @param {HTMLSelectElement} selectElement
//  * @param {string} searchText
//  */
// export default function selectBestMatch(selectElement, searchText) {
//   console.info('Selecting best match:', searchText);
//   const options = Array.from(selectElement.querySelectorAll('option'));

//   // Break down search text into individual words
//   const searchWords = searchText.toLowerCase().split(/\s+/);

//   let bestMatch = null;
//   let bestMatchScore = Number.MAX_SAFE_INTEGER;

//   for (const option of options) {
//     const optionText = option.textContent.toLowerCase();
//     const optionWords = optionText.split(/\s+/);

//     // Calculate a similarity score based on word matching
//     const score = calculateWordMatchingScore(searchWords, optionWords);

//     if (score < bestMatchScore) {
//       bestMatch = option;
//       bestMatchScore = score;
//     }
//   }

//   if (bestMatch) {
//     bestMatch.selected = true;
//   }
// }

/**
 *
 * @param {HTMLSelectElement} selectElement
 * @param {string} searchText
 */
export default function selectBestMatch(selectElement, searchText) {
  console.info('Selecting best match:', searchText);
  const options = Array.from(selectElement.querySelectorAll('option'));

  // Break down search text into individual words
  // const searchWords = searchText.toLowerCase().split(/[\s,-]+/); //.split(/\s+/); // to also split by space, comma, brackets, and dash (for example, "A, B, C" or "A - B - C" or "A (B) C"), then use what: .split(/[\s,-]+/);
  const searchWords = searchText.toLowerCase().split(/[\s,()\[\]-]+/);
  console.info('searchWords:', searchWords);
  let bestMatch = null;
  let bestScore = 0;

  console.info('options:', options);
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
      console.info('New best match:', bestMatch, bestScore);
    }
  }

  if (bestMatch) {
    bestMatch.selected = true;
  }
}
