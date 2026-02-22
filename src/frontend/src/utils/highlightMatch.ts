export interface HighlightSegment {
  text: string;
  isMatch: boolean;
}

export function splitByMatch(text: string, query: string): HighlightSegment[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return [{ text, isMatch: false }];
  }

  const normalizedText = text.toLowerCase();
  const segments: HighlightSegment[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const matchIndex = normalizedText.indexOf(normalizedQuery, cursor);

    if (matchIndex === -1) {
      segments.push({ text: text.slice(cursor), isMatch: false });
      break;
    }

    if (matchIndex > cursor) {
      segments.push({ text: text.slice(cursor, matchIndex), isMatch: false });
    }

    const matchEnd = matchIndex + normalizedQuery.length;
    segments.push({ text: text.slice(matchIndex, matchEnd), isMatch: true });
    cursor = matchEnd;
  }

  return segments.length > 0 ? segments : [{ text, isMatch: false }];
}
