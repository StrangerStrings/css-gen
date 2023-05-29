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

  // quick replace :after with ::after - sometimes gpt gets it wrong
  chatResponse = chatResponse.replace(/([a-z]):(before|after)/g, "$1::$2");
  
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
    }
    else {
      console.log('did not parse css as it has '+uniqueClasses.length+' classes.');
      console.log(css);
      return ['0or3classes'];
    }
  } catch  (err) {
    console.error(err.message);
    console.log(css);
  }
}