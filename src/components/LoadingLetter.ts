import { css, customElement, html, internalProperty, LitElement, property, TemplateResult } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { Doodle } from "../types";
import { Random, RandomElement } from "../Randomizer";

export type LetterConfig = {
	letter: string;
	x: number;
	y: number;
	time: number;
	delay: number;
}

export function createLetter(): LetterConfig {
	const x = Random(0, 100);
	const y = Random(0, 100);
	const max = 3;
	const wavesOnScreen = .5;
	const delayFraction = (x+(y/3)) * wavesOnScreen + Random(-max/2, max/2);

	const delay = delayFraction*max/100;
	const time = max;

	const word = 'Loading'
	const letter = RandomElement(word.split(''));

	return {
		letter, x, y, time, delay
	};
}

function XandY(): [number, number] {
	return [0,50];
} 

/**
 * a blank element that takes a generated css string
 * and displays the css picture/pattern/doodle
 */
@customElement("loading-letter")
export class LoadingLetter extends LitElement{
	static styles = [
		defaultStyles,
		css`
			:host {
				font-size:3rem;
			}
			/* todo bg: change this to root (somehow) **/
			.position {
				position: absolute;
				transform: translate(-50%, 50%);
			}
			.opacity {
					animation-name: fadeIn;
					animation-iteration-count: infinite;
					animation-fill-mode: forwards;
					opacity: 0;
				}
			.letter {

			}

			@keyframes fadeIn {
				0% {
					opacity: 0;
				}
				5% {
					opacity: 1;
				}
				10% {
					opacity: 0.7;
				}
				35% {
					opacity: 0.1;
				}
				70% {
					opacity: 0;
				}
				100% {
					opacity: 0;
				}
			}
			
		`
	];

	@property({type: String}) letter: string = "";
	@property({type: Number}) x: number = 0;
	@property({type: Number}) y: number = 0;
	@property({type: Number}) delay: number = 0;
	@property({type: Number}) time: number = 2;

	
	render() {
		const position = styleMap({
			left: `${this.x}%`,
			bottom: `${this.y}%`
		});

		const delay = styleMap({
			'animationDelay': `${this.delay}s`,
			'animationDuration': `${this.time}s`,
		})

		console.log(this.letter);
		

		return html`
			<div class="position" style=${position}>
				<div class="opacity" style=${delay}>
					<div class="letter">${this.letter}</div>
				</div>
			</div>
		`;
	}

}
