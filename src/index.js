const fs = require('fs');

// Subfunciones para las transformaciones específicas
// Pregunta 1
const addIndentationToPhrase = (text, n) =>
  text.replace(/(?<=\. )/g, ' '.repeat(n));

// Pregunta 2
const addLineBreaks = (text, n) => {
  const paragraphs = text.split('\n\n');
  // Separo los parrafos en lineas
  const separatedParagraphs = paragraphs.map((paragraph) => paragraph.split('\n').join(' ').trim());
  // Uno los parrafos usando `n` saltos de linea
  const result = separatedParagraphs.join('\n'.repeat(n + 1));
  return result;
};

// Pregunta 3
const limitWidth = (text, n) =>
  text.split('\n')
    .map(line => {
      if (line.length <= n) {
        return line;
      } else {
        let words = line.split(' ');
        let lines = words.reduce((acc, word) => {
          if (acc.length === 0 || acc[acc.length - 1].length + word.length + 1 > n) {
            acc.push(word);
          } else {
            acc[acc.length - 1] += ' ' + word;
          }
          return acc;
        }, []);
        return lines.map(line => line.padEnd(n, ' ')).join('\n');
      }
    })
    .join('\n');


// Pregunta 4
const addParagraphIndentation = (text, n) =>
  text.replace(/^(?!\s*$)/gm, ' '.repeat(n));

// Pregunta 5 y 6
const filterParagraphs = (text, min, max) =>
  text.split('\n\n')
    .filter(paragraph => {
      let sentences = paragraph.split('.').length;
      return sentences >= min && sentences <= max;
    })
    .join('\n\n');

// Pregunta 7
const convertToParagraphs = (text) => {
  // Separo el texto en frases
  const phrases = text.split(/\.(\s+)/);
  const paragraphs = phrases.reduce((acc, phrase) => {
    // Si la frase no es solo espacios en blanco
    if (phrase.match(/\S/)) {
      // Si el último elemento del array es un string vacío, es porque la frase anterior terminaba con un punto
      acc.push(`\n\n${phrase.trim()}.`);
    }
    return acc;
  }, []);
  return paragraphs.join('');
}

// Pregunta 8
const takeFirstSentences = (text, n) =>
  text.split('\n\n')
    .map(paragraph => paragraph.split('.').slice(0, n).join('.') + '.')
    .join('\n\n');

// función principal que encadena las transformaciones
const transformFile = (options, inputFilePath, outputFilePath) => {
  let text = fs.readFileSync(inputFilePath, 'utf-8');
  // console.log(text);
  // Pregunta 1
  // text = addIndentationToPhrase(text, options.indentation);
  // console.log(text);
  // Pregunta 2
  // text = addLineBreaks(text, options.lineBreaks);
  // console.log(text);
  // Pregunta 3
  // text = limitWidth(text, options.width);
  // console.log(text);
  // Pregunta 4
  text = addParagraphIndentation(text, options.paragraphIndentation);
  console.log(text);
  // Pregunta 5 y 6
  // text = filterParagraphs(text, options.minSentences, options.maxSentences);
  // console.log(text);
  // Pregunta 7
  // text = convertToParagraphs(text);
  // console.log(text);
  // Pregunta 8
  // text = takeFirstSentences(text, options.firstSentences);
  // console.log(text);
  fs.writeFileSync(outputFilePath, text);
};

// Reglas de uso
const options = {
  indentation: 2,
  lineBreaks: 2,
  width: 80,
  paragraphIndentation: 4,
  minSentences: 4,
  maxSentences: 10,
  firstSentences: 2
};

const args = process.argv.slice(2);
const inputFilePath = args[0] || './src/example/input.txt';
const outputFilePath = args[1] || './src/example/output.txt';

transformFile(options, inputFilePath, outputFilePath);
