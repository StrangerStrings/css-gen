import { Palette } from "../types";
import { colourResponses } from "./mockColours";
import { mockCss } from "./mockCss";

export function parseColours(chatResponse?: string): Palette {
  chatResponse = chatResponse ?? colourResponses[0];

  const regex = /#[0-9A-Fa-f]{6}/g;
  const matches = chatResponse.match(regex);
  let colours = Array.from(matches);
  const background = colours.pop();
  // colours = colours.slice(0,6);

  return {
    colours, background
  };
}

export function parseCss(chatResponse?: string): string {
  console.log(chatResponse);  

  // quick replace :after with ::after - so main regex below works
  chatResponse = chatResponse.replace(/([a-z]):(before|after)/g, "$1::$2");

  // replace @keyframes from {} and to {} with 0% {} and 100% {}
  if (chatResponse.includes('to {') && chatResponse.includes('from {')) {
    chatResponse = chatResponse.replace(/from \{/g, "0% {").replace(/to \{/g, "100% {");
  }
  
  // pulls out any css blocks that are div, span or .any-class followed by { some:Css; }
  // and separately any @keyframes { 0%{stuff} 100%{stuff} } blocks
  const regex = /((div|span|\.[\w-]+(::before|::after)?)(,\s*(div|span|\.[\w-]+(::before|::after)?))*\s*\{[^}]*?\})|(@keyframes\s+[\w-]+\s*\{(\s*\d+%?\s*\{[^}]*\}\s*)*\})/gs;
  const cssBlocks = chatResponse.match(regex);

  const css = cssBlocks.join('\n');
  console.log(css);
  return css;
}

export function parseCssClass(css: string): [string, string?] {
  try {
    let regex = /(?<![0-9])\.[\w-]+/g;
    let classNames = css.match(regex).map(classWithDot => classWithDot.slice(1));
    let uniqueClasses = [...new Set(classNames)]
    if (uniqueClasses.length == 1) {
      console.log(uniqueClasses[0]);
      return [uniqueClasses[0]];
    }
    else if (uniqueClasses.length == 2) {
      console.log(uniqueClasses[0], uniqueClasses[1]);
      return [uniqueClasses[0], uniqueClasses[1]];
    } else if (uniqueClasses.length > 2) {
      return ['moreThan2Classes', uniqueClasses.join(' ,')];
    }
    else {
      console.log('did not parse css as it has 0 classes.');
      console.log(css);
      return ['0classes'];
    }
  } catch  (err) {
    console.error(err.message);
    console.log(css);
  }
}

export function parseAnimationTiming(chatResponse?: string): number[] {
  let regex = /(?<=animation[^]*?)\d+(?=s)/g;
  const numberStrings = chatResponse.match(regex);
  const numbers: number[] = [];
  for (const numberString of numberStrings) {
    try {
      numbers.push(Number(numberString));
    } catch {}
  }
  return numbers;
}