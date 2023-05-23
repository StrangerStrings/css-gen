import { Palette } from "../types";

export function parseColours(chatResponse: string): Palette[] {
  return [
    {background: 'grey', colours: [
      'pink', 'black', 'white', 'green', 'orange' 
    ]},
    {background: 'black', colours: [
      'blue', 'purple', 'green', 'red', 'grey' 
    ]},
    {background: 'white', colours: [
      'purple', 'green', 'grey', 'orange', 'blue' 
    ]},
  ]
  // match all hex codes as well as background
}

export function parseCss(chatResponse: string): string {
  return `
.animated-shape {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: linear-gradient(120deg, #20bf55, #01baef);
  border-radius: 70% 30% 50% 50%/50% 60% 40% 50%;
  animation: move 5s ease-in-out infinite;
}

.animated-shape::before, .animated-shape::after {
  content: '';
  position: absolute;
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite alternate;
}

.animated-shape::before {
  top: -40px;
  left: 45%;
}

.animated-shape::after {
  bottom: -40px;
  right: 45%;
}

@keyframes move {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  
  25% {
    transform: translate(-150%, -50%) rotate(45deg);
  }
  
  50% {
    transform: translate(-150%, -150%) rotate(90deg);
  }
  
  75% {
    transform: translate(-50%, -150%) rotate(135deg);
  }
  
  100% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
`
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
