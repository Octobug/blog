export function tokenize(text: string): Array<string> {
  // @ts-ignore: seems like Intl.Segmenter is not supported by the lang server
  const segmenter = new Intl.Segmenter("cn", { granularity: "word" });
  const words = Array.from(segmenter.segment(text)).map(
    // @ts-ignore
    (item) => item.segment);
  return words.filter(w => w !== " ");
}
