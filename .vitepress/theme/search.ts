export function tokenize(text: string): Array<string> {
  // Firefox doesn't support Intl.Segmenter currently
  if (!("Segmenter" in Intl)) {
    return text.split(" ");
  }

  // @ts-ignore: seems like Intl.Segmenter is not supported by the lang server
  const segmenter = new Intl.Segmenter("cn", { granularity: "word" });
  const words = Array.from(segmenter.segment(text)).map(
    // @ts-ignore
    (item) => item.segment);
  return words.filter(w => w !== " ");
}
