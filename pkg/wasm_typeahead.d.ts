/* tslint:disable */
/* eslint-disable */
/**
*/
export class Typeahead {
  free(): void;
/**
* @param {string} search_space_string
* @returns {Typeahead}
*/
  static new(search_space_string: string): Typeahead;
/**
* @param {string} search_string
* @returns {string}
*/
  search(search_string: string): string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_typeahead_free: (a: number) => void;
  readonly typeahead_new: (a: number, b: number) => number;
  readonly typeahead_search: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
