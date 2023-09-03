export default function calculateWordMatchingScore(words1, words2) {
  // Calculate a similarity score based on the number of matching words
  // You can adjust this formula based on your specific requirements
  const commonWords = words1.filter((word) => words2.includes(word));
  const score = commonWords.length / Math.max(words1.length, words2.length);

  return score;
}
