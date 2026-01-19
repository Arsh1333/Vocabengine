export function toDayString(timestamp) {
  return new Date(timestamp).toDateString();
}

export function getStreaks(savedWords) {
  if (!savedWords.length) {
    return { current: 0, best: 0 };
  }

  const days = Array.from(
    new Set(savedWords.map(w => toDayString(w.savedAt)))
  ).sort((a, b) => new Date(a) - new Date(b));

  // current streak
  let current = 0;
  let today = new Date();

  for (let i = days.length - 1; i >= 0; i--) {
    if (new Date(days[i]).toDateString() === today.toDateString()) {
      current++;
      today.setDate(today.getDate() - 1);
    } else break;
  }

  // best streak
  let best = 1;
  let temp = 1;

  for (let i = 1; i < days.length; i++) {
    const diff =
      (new Date(days[i]) - new Date(days[i - 1])) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      temp++;
    } else {
      best = Math.max(best, temp);
      temp = 1;
    }
  }

  best = Math.max(best, temp);

  return { current, best };
}
