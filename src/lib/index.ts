import { filters, TransformationConfig } from "./filters";

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
export function transform(text: string, options: TransformationConfig[]): string {
  return options.reduce((acc, { name, options }) => filters[name].fn(acc, options as any), text);
}
