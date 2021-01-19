import {preProcessStrings, search} from './search';

export function connectTypeahead({
  input: typeahead,
  list,
  image,
}: {
  input: HTMLInputElement,
  list: HTMLDivElement,
  image?: HTMLImageElement,
}) {
  let processedNames = [];
  let imageLoading = false;
  let loaded = false;
  fetch('/allnames.json')
  .then(n => n.json())
  .then(names => {
    processedNames = preProcessStrings(names);
    loaded = true;
  });

  const loader = document.createElement('div');
  loader.classList.add('lds-hourglass');
  loader.style.left = `${typeahead.getBoundingClientRect().right - 70}px`;
  loader.style.top = `${typeahead.getBoundingClientRect().top}px`;

  function click(val) {
    return function() {
      if (image) {
        image.src = '';
        document.body.append(loader);
        fetch(`https://api.scryfall.com/cards/named?exact=${val}`, {
          mode: 'cors', // no-cors, *cors, same-origin,
        })
        .then(x => x.json())
        .then(({image_uris}) => image.src = image_uris.normal);
      }
    }
  }

  image.onload = () => {
    loader.remove();
  }

  function fillList(vals) {
    const children = list.children;
    [...children].forEach((child, i) => {
      const val = vals[i];
      if (i > vals.length - 1) {
        child.classList.add('hide');
        return;
      }
      child.classList.remove('hide')
      if (child.textContent === val) return;
      const listener = click(val);
      child.removeEventListener('click', child.listener);
      child.textContent = val;
      child.listener = listener;
      child.addEventListener('click', listener);
    });
  }

  for(let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    list.append(div);
  }


  function eventListener() {
    if (!loaded) return;
    const query = typeahead.value;
    if (query.length === 0) {
      fillList([]);
      return;
    }
    const result = search(query, processedNames);
    console.log(result);
    const resultCards = result.map(({val}) => val);
    console.log(resultCards);
    fillList(resultCards);
  }

  typeahead.addEventListener('input',eventListener);
}
