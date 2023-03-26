import { optionsType } from "./types";
import filters from "./filters";

export const defaultOptions: optionsType = {
  addIndentationToPhrase: {
    name: "Add indentation to phrase",
    active: false,
    params: {
      n: 2
    }
  },
  addLineBreaks: {
    name: "Add line breaks",
    active: false,
    params: {
      n: 2
    }
  },
  limitWidth: {
    name: "Limit width",
    active: false,
    params: {
      n: 80
    }
  },
  addParagraphIndentation: {
    name: "Add paragraph indentation",
    active: false,
    params: {
      n: 4
    }
  },
  filterParagraphs: {
    name: "Filter paragraphs",
    active: false,
    params: {
      min: 4,
      max: 10
    }
  },
  convertToParagraphs: {
    name: "Convert to paragraphs",
    active: false,
    params: {}
  },
}

/**
 * Function that applies the filters to the text according to the options.
 * When a filter is active, it is applied to the text, with its corresponding
 * parameters, set in the params property of the filter.
 * 
 * @param text - The text to be transformed.
 * @param options - Determine which filters are active and their parameters.
 * 
 * @returns {string} The transformed text.
 */
export function transform(text: string, options: optionsType = defaultOptions): string {
  let transformedText = text
  Object.entries(options).forEach(([filterName, filterConfig]) => {
    if (filterConfig.active) {
      transformedText = filters[filterName](transformedText, options[filterName].params)
    }
  })
  return transformedText
}
