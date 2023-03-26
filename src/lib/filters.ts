import { filterType } from "./types";

// Pregunta 1
const addIndentationToPhrase = (text: string, { n }: any) => text.replace(/(?<=\. )/g, " ".repeat(n));

// Pregunta 2
const addLineBreaks = (text: string, { n }: any) =>
  text
    .split("\n\n")
    .map((paragraph) => paragraph.split("\n").join(" ").trim())
    .join("\n".repeat(n + 1));

// Pregunta 3
const limitWidth = (text: string, { n }: any ) =>
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
const addParagraphIndentation = (text: string, { n }: any) => text.replace(/^(?!\s*$)/gm, " ".repeat(n));

// Pregunta 5 y 6
const filterParagraphs = (text: string, { min, max }: any) =>
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

const takeFirstSentences = (text: string, { n }: any) =>
  text
    .split("\n\n")
    .map((paragraph) => paragraph.split(".").slice(0, n).join(".") + ".")
    .join("\n\n");

const filters: filterType = {
  addIndentationToPhrase,
  addLineBreaks,
  limitWidth,
  addParagraphIndentation,
  filterParagraphs,
  convertToParagraphs,
  takeFirstSentences,
};

export default filters;