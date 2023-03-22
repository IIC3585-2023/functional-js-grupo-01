import { array as arr, function as fn } from "fp-ts";

// Pregunta 1
const addIndentationToPhrase = (text: string, n: number) => text.replace(/(?<=\. )/g, " ".repeat(n));

// Pregunta 2
const addLineBreaks = (text: string, n: number) =>
  text
    .split("\n\n")
    .map((paragraph) => paragraph.split("\n").join(" ").trim())
    .join("\n".repeat(n + 1));

// Pregunta 3
const reduceFlatWithStackLastItem =
  <In, Out>(f: (last: Out[], current: In) => Out[][]) =>
  (array: In[]): Out[][] =>
    array.reduce((acc, value) => [...acc.slice(0, acc.length - 1), ...f(acc[acc.length - 1], value)], [[]] as Out[][]);

const limitWidth = (text: string, length: number) =>
  fn.pipe(
    // Separar por lineas
    text.split("\n"),
    arr.chain(
      fn.flow(
        // Separar cada linea por espacio, quedamos string[]
        (line) => line.split(" "),
        // Separamos las lineas, quedando string[][]
        reduceFlatWithStackLastItem((last: string[], word) =>
          last.join(" ").length + word.length > length ? [last, [word]] : [[...last, word]]
        ),
        // Unimos cada linea que quedó
        arr.map((line) => line.join(" "))
      )
    ),
    // Unimos las lineas
    (lines) => lines.join("\n")
  );

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
  return limitWidth(text, 25);
}
