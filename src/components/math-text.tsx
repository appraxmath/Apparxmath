import type { ReactNode } from "react";

type MathTextProps = { text: string; className?: string; lang?: string };

const superscriptToPlain: Record<string, string> = {
  "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
  "⁺": "+", "⁻": "-", "⁼": "=", "⁽": "(", "⁾": ")", "ⁿ": "n", "ⁱ": "i", "ˣ": "x", "ʸ": "y"
};

/** Convert Unicode superscript input to ordinary calculator exponent syntax. */
export function normalizeSuperscriptInput(input: string): string {
  return input.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱˣʸ]+/g, (run) => {
    const exponent = [...run].map((character) => superscriptToPlain[character]).join("");
    return exponent.startsWith("(") && exponent.endsWith(")") ? `^${exponent}` : `^${exponent}`;
  });
}

export function MathText({ text, className, lang }: MathTextProps) {
  const parts: ReactNode[] = [];
  let position = 0;
  let key = 0;

  while (position < text.length) {
    const caret = text.indexOf("^", position);
    const unicode = text.slice(position).search(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱˣʸ]/);
    const unicodeAt = unicode < 0 ? -1 : position + unicode;
    const marker = caret < 0 ? unicodeAt : unicodeAt < 0 ? caret : Math.min(caret, unicodeAt);

    if (marker < 0) { parts.push(text.slice(position)); break; }
    if (marker > position) parts.push(text.slice(position, marker));

    let exponent = "";
    let end = marker;
    if (text[marker] === "^") {
      let cursor = marker + 1;
      if (text[cursor] === "(") {
        const start = ++cursor;
        let depth = 1;
        while (cursor < text.length && depth) {
          if (text[cursor] === "(") depth++;
          if (text[cursor] === ")") depth--;
          cursor++;
        }
        if (depth) { parts.push("^"); position = marker + 1; continue; }
        exponent = text.slice(start, cursor - 1);
        end = cursor;
      } else {
        if (text[cursor] === "+" || text[cursor] === "-") cursor++;
        const start = cursor;
        while (cursor < text.length && /[a-zA-Z0-9.]/.test(text[cursor])) cursor++;
        if (cursor === start) { parts.push("^"); position = marker + 1; continue; }
        exponent = text.slice(marker + 1, cursor);
        end = cursor;
      }
    } else {
      let cursor = marker;
      while (cursor < text.length && /[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿⁱˣʸ]/.test(text[cursor])) cursor++;
      exponent = [...text.slice(marker, cursor)].map((character) => superscriptToPlain[character]).join("");
      end = cursor;
    }
    parts.push(<sup key={key++} style={{ fontSize: "0.72em" }}>{exponent}</sup>);
    position = end;
  }

  return <span className={className} lang={lang}>{parts}</span>;
}
