use wasm_bindgen::prelude::*;
use levenshtein::levenshtein;
use std::cmp::Ordering;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log(a: &str);
}

struct Match {
    starts_with: bool,
    includes: bool,
    distance: usize,
    val: String,
}

#[wasm_bindgen]
struct Typeahead {
    search_space: Vec<(String, String)>,
}

#[wasm_bindgen]
impl Typeahead {
    pub fn new(search_space_string: &str) -> Typeahead {
        let strings : Vec<(String, String)> = search_space_string.split('|').map(|s| (s.to_string(), s.to_string().to_lowercase())).collect();
        Typeahead { search_space: strings}
    }

    pub fn search(&self, search_string: &str) -> String {
        let mut some_includes : bool = false;
        let lower_case_search_string = search_string.to_lowercase();
        let mut matches = self.search_space.iter().fold(Vec::new(), |mut matches, val| {
            let starts_with = val.1.starts_with(&lower_case_search_string);
            let includes = starts_with || val.1.contains(&lower_case_search_string);
            if (!some_includes && includes) {
                some_includes = true;
            }
            if includes || matches.len() < 10 {
                let distance = levenshtein(&val.1, &lower_case_search_string);
                matches.push(Match{starts_with: starts_with, includes: includes, distance: distance, val: val.0.to_string()});
            }
            return matches;
        });

        if (some_includes) {
            matches = matches.into_iter().filter(|m| m.includes).collect();
        }

        matches.sort_unstable_by(|m1, m2| {
            if m1.starts_with && m2.starts_with {
                return m1.distance.cmp(&m2.distance);
            } else if m1.starts_with {
                return Ordering::Less;
            } else if m1.includes && m2.includes {
                return m1.distance.cmp(&m2.distance);
            } else if m1.includes {
                return Ordering::Less;
            } else {
                return m1.distance.cmp(&m2.distance);
            }
        });

        return matches.into_iter().map(|m| m.val).take(10).collect::<Vec<String>>().join("|");
    }
}
