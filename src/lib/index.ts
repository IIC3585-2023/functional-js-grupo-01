// Pregunta 1
const addIndentationToPhrase = (text: string, n: number) => text.replace(/(?<=\. )/g, " ".repeat(n));

// Pregunta 2
const addLineBreaks = (text: string, n: number) =>
  text
    .split("\n\n")
    .map((paragraph) => paragraph.split("\n").join(" ").trim())
    .join("\n".repeat(n + 1));

// Pregunta 3
const limitWidth = (text: string, n: number) =>
  text
    .split("\n")
    .map((line) => {
      if (line.length <= n) {
        return line;
      } else {
        let words = line.split(" ");
        let lines = words.reduce((acc, word) => {
          if (acc.length === 0 || acc[acc.length - 1].length + word.length + 1 > n) {
            acc.push(word);
          } else {
            acc[acc.length - 1] += " " + word;
          }
          return acc;
        }, [] as string[]);
        return lines.map((line) => line.padEnd(n, " ")).join("\n");
      }
    })
    .join("\n");

// Pregunta 4
const addParagraphIndentation = (text: string, n: number) => text.replace(/^(?!\s*$)/gm, " ".repeat(n));

// Pregunta 5 y 6
const filterParagraphs = (text: string, min: number, max: number) =>
  text
    .split("\n\n")
    .filter((paragraph) => {
      let sentences = paragraph.split(".").length;
      return sentences >= min && sentences <= max;
    })
    .join("\n\n");

// Pregunta 7
const convertToParagraphs = (text: string) => {
  // Separo el texto en frases
  const phrases = text.split(/\.(\s+)/);
  const paragraphs = phrases.reduce((acc, phrase) => {
    // Si la frase no es solo espacios en blanco
    if (phrase.match(/\S/)) {
      // Si el último elemento del array es un string vacío, es porque la frase anterior terminaba con un punto
      acc.push(`\n\n${phrase.trim()}.`);
    }
    return acc;
  }, [] as string[]);
  return paragraphs.join("");
};

const takeFirstSentences = (text: string, n: number) =>
  text
    .split("\n\n")
    .map((paragraph) => paragraph.split(".").slice(0, n).join(".") + ".")
    .join("\n\n");

const defaultOptions = {
  indentation: 2,
  lineBreaks: 2,
  width: 80,
  paragraphIndentation: 4,
  minSentences: 4,
  maxSentences: 10,
  firstSentences: 2,
};

export function transform(text: string, options = defaultOptions) {
  return text.replaceAll("hola", "adios");
}
