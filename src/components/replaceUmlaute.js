const umlautMap = {
    '\u00dc': 'U',
    '\u00c4': 'A',
    '\u00d6': 'O',
    '\u00fc': 'u',
    '\u00e4': 'a',
    '\u00f6': 'o',
    '\u00df': 'ss',
}

export function replaceUmlaute(str) {
    return str
        .replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, (a) => {
            const big = umlautMap[a.slice(0, 1)];
            return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1);
        })
        .replace(new RegExp('['+Object.keys(umlautMap).join('|')+']',"g"),
            (a) => umlautMap[a]
        );
}
