const fs = require('fs');

// subfunciones para las transformaciones específicas
const addIndentation = (text, n) =>
  text.replace(/(?<=\. )/g, ' '.repeat(n));

const addLineBreaks = (text, n) =>
  text.replace(/(?<=\.)(?!$)/g, '\n'.repeat(n));

const limitWidth = (text, n) =>
  text.split('\n')
    .map(line => {
      if (line.length <= n) {
        return line;
      } else {
        let result = '';
        let words = line.split(' ');
        let currentLine = '';
        for (let i = 0; i < words.length; i++) {
          if (currentLine.length + words[i].length + 1 <= n) {
            currentLine += (currentLine ? ' ' : '') + words[i];
          } else {
            result += currentLine.padEnd(n, ' ') + '\n';
            currentLine = words[i];
          }
        }
        return result + currentLine.padEnd(n, ' ');
      }
    })
    .join('\n');

const addParagraphIndentation = (text, n) =>
  text.replace(/^(?!\s*$)/gm, ' '.repeat(n));

const filterParagraphs = (text, min, max) =>
  text.split('\n\n')
    .filter(paragraph => {
      let sentences = paragraph.split('.').length;
      return sentences >= min && sentences <= max;
    })
    .join('\n\n');

const takeFirstSentences = (text, n) =>
  text.split('\n\n')
    .map(paragraph => paragraph.split('.').slice(0, n).join('.') + '.')
    .join('\n\n');

// función principal que encadena las transformaciones
const transformFile = (options, inputFilePath, outputFilePath) => {
  let text = fs.readFileSync(inputFilePath, 'utf-8');
  // console.log(text);
  text = addIndentation(text, options.indentation);
  // console.log(text);
  // text = addLineBreaks(text, options.lineBreaks);
  // console.log(text);
  text = limitWidth(text, options.width);
  // console.log(text);
  // text = addParagraphIndentation(text, options.paragraphIndentation);
  // console.log(text);
  //   text = filterParagraphs(text, options.minSentences, options.maxSentences);
  //   console.log(text);
  //   text = takeFirstSentences(text, options.firstSentences);
  //   console.log(text);
  fs.writeFileSync(outputFilePath, text);
};

// ejemplo de uso
const options = {
  indentation: 2,
  lineBreaks: 2,
  width: 80,
  paragraphIndentation: 4,
  minSentences: 3,
  maxSentences: 10,
  firstSentences: 2
};

const args = process.argv.slice(2);
const inputFilePath = args[0] || './src/example/input.txt';
const outputFilePath = args[1] || './src/example/output.txt';

transformFile(options, inputFilePath, outputFilePath);
