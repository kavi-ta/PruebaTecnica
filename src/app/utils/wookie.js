// dictionary of wookie encodings
const encodings = {
        'a': 'ra',
        'b': 'rh',
        'c': 'oa',
        'd': 'wa',
        'e': 'wo',
        'f': 'ww',
        'g': 'rr',
        'h': 'ac',
        'i': 'ah',
        'j': '',
        'k': 'or',
        'l': 'an',
        'm': 'sc',
        'n': 'wh',
        'o': 'oo',
        'p': 'ak',
        'q': '',
        'r': 'rc',
        's': 'c',
        't': 'ao',
        'u': 'hu',
        'v': 'ho',
        'w': 'oh',
        'x': '',
        'y': 'ro',
        'z': 'uf'
    }

const WookieeEncodings = (char) => {
    // return the encoded char
    return encodings[char] ?? char;
}

module.exports = WookieeEncodings;