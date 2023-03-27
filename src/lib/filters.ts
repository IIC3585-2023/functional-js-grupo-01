import { array as arr, function as fn } from "fp-ts";

export type Params = Record<string, { default: number; name: string }>;
type FilterFn<P> = (text: string, params: { [key in keyof P]: number }) => string;
const transformFn = <P extends Params, Fn extends FilterFn<P>>(p: P, fn: Fn) => ({ params: p, fn });

// Pregunta 1
/** Cada frase debe comenzar con ​n​ espacios en blanco (después de un punto seguido) */
export const addIndentationToPhrase = transformFn(
  { n: { name: "Indentation", default: 2 } },
  (text, { n }) => text.replace(/(\. )/g, "." + " ".repeat(n))
);

// Pregunta 2
/** Cada párrafo debe estar separado por ​n​ líneas (después de un punto aparte) */
export const addLineBreaks = transformFn(
  { n: { name: "Line breaks", default: 2 } },
  (text, { n }) => text.split("\n\n").join("\n".repeat(n + 2))
);

// Pregunta 3
const reduceFlatWithStackLastItem = <In, Out>(f: (last: Out[], current: In) => Out[][]) =>
  arr.reduce<In, Out[][]>([[]], (acc, value) => [
    ...acc.slice(0, acc.length - 1),
    ...f(acc[acc.length - 1], value),
  ]);

/** El ancho del texto debe ser a lo más ​n​ (sin cortar palabras) */

export const limitWidth = transformFn({ n: { name: "Width", default: 80 } }, (text, { n }) =>
  fn.pipe(
    // Separar por lineas
    text.split("\n"),
    arr.chain(
      fn.flow(
        // Separar cada linea por espacio, quedamos string[]
        (line) => line.split(" "),
        // Separamos las lineas, quedando string[][]
        reduceFlatWithStackLastItem((last: string[], word) =>
          last.join(" ").length + word.length > n ? [last, [word]] : [[...last, word]]
        ),
        // Unimos cada linea que quedó
        arr.map((line) => line.join(" "))
      )
    ),
    // Unimos las lineas
    (lines) => lines.join("\n")
  )
);

// Pregunta 4
/** Cada párrafo debe tener ​n​ espacios de sangría */
export const addParagraphIndentation = transformFn(
  { n: { name: "Indentation", default: 4 } },
  (text, { n }) => text.replace(/^(?!\s*$)/gm, " ".repeat(n))
);

// Pregunta 5 y 6
/**
 * Se ignoran los párrafos que tienen menos de ​n​ frases.
 * Se ignoran los párrafos que tienen más de ​n​ frases.
 **/
export const filterParagraphs = transformFn(
  { min: { name: "Min sentences", default: 4 }, max: { name: "Max sentences", default: 10 } },
  (text, { min, max }) =>
    text
      .split("\n\n")
      .filter((paragraph) => {
        let sentences = paragraph.split(".").length;
        return sentences >= min && sentences <= max;
      })
      .join("\n\n")
);

/** Cada frase debe aparecer en párrafo aparte */
export const convertToParagraphs = transformFn({}, (text) =>
  text
    .split("\n")
    .map((line) =>
      line
        .split(".")
        .map((p) => p.trimStart())
        .join(".\n")
        .trimEnd()
    )
    .join("\n")
);

// Pregunta 8
/** Solo las primeras ​n​ frases de cada párrafo */
export const takeFirstSentences = transformFn(
  { n: { name: "Sentences", default: 2 } },
  (text, { n }) =>
    text
      .split("\n\n")
      .map((paragraph) => paragraph.split(".").slice(0, n).join(".") + ".")
      .join("\n\n")
);

export type FilterName = keyof typeof filters;
export const filters = {
  addIndentationToPhrase,
  addLineBreaks,
  limitWidth,
  addParagraphIndentation,
  filterParagraphs,
  convertToParagraphs,
  takeFirstSentences,
};

export type TransformationConfig<
  N extends FilterName = FilterName,
  P extends Record<string, number> = { [key in keyof typeof filters[N]["params"]]: number }
> = { name: N; options: P };
