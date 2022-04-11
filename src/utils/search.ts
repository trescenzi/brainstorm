import { distance } from "fastest-levenshtein";

interface SearchObject {
  val: any;
  tokens: Array<string>;
  processed: string;
}

interface Match extends SearchObject {
  includes: boolean;
  startsWith: boolean;
  distance: number;
}

function findPreferedMatch(oldMatch: Match, newMatch: Match): Match {
  return compareMatchs(oldMatch, newMatch) > 0 ? newMatch : oldMatch;
}

function compareMatchs(oldMatch: Match, newMatch: Match): number {
  if (newMatch.startsWith && oldMatch.startsWith) {
    return oldMatch.distance - newMatch.distance;
  } else if (newMatch.startsWith) {
    return 1;
  } else if (oldMatch.includes && newMatch.includes) {
    return oldMatch.distance - newMatch.distance;
  } else if (newMatch.includes) {
    return 1;
  } else {
    return oldMatch.distance - newMatch.distance;
  }
}

window.times = {};
window.averageTimes = function (name) {
  return times[name].reduce((acc, t) => acc + t, 0) / times[name].length;
};

function time(fn, name) {
  const startTime = performance.now();
  const r = fn();
  const endTime = performance.now();
  const totalTime = endTime - startTime;
  if (window.times[name]) {
    window.times[name].push(totalTime);
  } else {
    window.times[name] = [totalTime];
  }
  //console.log(totalTime, name);
  return r;
}

export function search(
  str: string,
  searchSpace: Array<SearchObject>
): Array<Match> {
  str = preprocess(str);
  let numIncludes = 0;
  let weighted = time(
    () =>
      searchSpace.reduce((matches: Array<Match>, n: SearchObject) => {
        const startsWith = n.processed.startsWith(str);
        const includes = startsWith || n.processed.includes(str);
        if (includes) numIncludes++;
        if (!includes && numIncludes > 10) return matches;
        matches.push({
          val: n.val,
          tokens: n.tokens,
          processed: n.processed,
          distance: distance(str, n.processed),
          startsWith,
          includes,
        });
        return matches;
      }, []),
    "measure-default"
  );
  if (numIncludes > 0) {
    weighted = weighted.filter((w) => w.includes);
  }
  const sorted = time(() => weighted.sort(compareMatchs), "sort");
  return sorted.slice(0, 10);
}

export function searchSpread(
  str: string,
  searchSpace: Array<SearchObject>
): Array<Match> {
  str = preprocess(str);
  const weighted = time(
    () =>
      searchSpace.map((n: SearchObject) => ({
        ...n,
        distance: distance(str, n.processed),
        includes: n.processed.includes(str),
      })),
    "measure-spread"
  );
  const sorted = time(() => weighted.sort(compareMatchs), "sort");
  return sorted.slice(0, 10);
}

export function searchIndex(
  str: string,
  searchSpace: Array<SearchObject>
): Array<Match> {
  str = preprocess(str);
  const weighted = time(
    () =>
      searchSpace.map((n: SearchObject, i: number) => ({
        index: i,
        distance: distance(str, n.processed),
        includes: n.processed.includes(str),
      })),
    "measure-mem"
  );
  const sorted = time(() => weighted.sort(compareMatchs), "sort");
  return sorted.slice(0, 10).map((n) => searchSpace[n.index]);
}

export function preprocess(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, "");
}

export function preProcessStrings(strings: Array<string>): Array<SearchObject> {
  return strings.reduce((strings, string) => {
    const processed = preprocess(string);
    strings.push({
      val: string,
      tokens: processed.split(" ") || [],
      processed,
    });
    return strings;
  }, []);
}
