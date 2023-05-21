import { Palette } from "../types";

export function parseColours(chatResponse: string): Palette[] {
  // match all hex codes as well as thingy
}

export function parseCss(chatResponse: string): string {

}

export function parseCssClass(css: string): string {
let regex = /\.(\w+)/g;
let matches;
let classNames = new Set<string>();

while ((matches = regex.exec(css)) !== null) {
  classNames.add(matches[1]);
}

return classNames[0]
}
