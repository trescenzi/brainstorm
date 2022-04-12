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
  export class TypeahaedConstructor {
    public static new(search_space: string): Typeahead;
  }
  export class Typeahead {
    search(search: string): string;
    free(): void;
  }

  export default function init() : Promise<void>;
}

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}
