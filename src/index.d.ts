declare module 'accessible-autocomplete/preact' {
  import {FunctionComponent} from 'preact'

  type AccessibleAutocompleteProps = {
    source: string[];
    id: string;
    name: string;
    autoselect?: boolean;
    confirmOnBlue?: boolean;
    displayMenu?: 'overlay' | 'inline';
    onConfirm: (option: string) => void;
  };

  const AccessibleAutocomplete: FunctionComponent<AccessibleAutocompleteProps>

  export default AccessibleAutocomplete;
}

declare module 'pkg/wasm_typeahead' {
  export class Typeahead {
    static new(search_space: string): Typeahead;
    search(search: string): string;
    free(): void;
  }

  export default function init() : Promise<void>;
}
