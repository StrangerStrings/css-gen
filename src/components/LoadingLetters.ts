import { css, customElement, html, internalProperty, LitElement, property, TemplateResult } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { styleMap } from 'lit-html/directives/style-map';
import { Random, RandomInt } from "../Randomizer";

export type LetterConfig = {
	letter: string;
	x: number;
	y: number;
	delay: number;
}

/**
 * a full screen loading page with randomly generated letters
 * that fade in and out, like a wave
 */
@customElement("loading-letters")
export class LoadingLetters extends LitElement{
	static styles = [
		defaultStyles,
		css`
			:host {
				color: var(--color);
			}
			.letters-container {
				position: relative;
				height: 100%;
				width: 100%;
				overflow: hidden;
				background: black;	
			}
			.position {
				position: absolute;
				transform: translate(-50%, 50%);
			}
			.opacity {
				animation-name: wave;
				animation-iteration-count: infinite;
				animation-fill-mode: forwards;
				opacity: 0;
			}
			.letter {
				font-size:3rem;
			}

			@keyframes wave {
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
			.word {
				position: absolute;
				left:50%;
				top: 40%;
				transform: translate(-50%, 50%);
				opacity: 0.9;
				font-size: 4.2rem;
				letter-spacing: 0.7rem;
				user-select: none;
			}
		`
	];

	/** The word to display in characters scattered across the screen */
	@property({type: String}) word: string = "Loading";
	/** How long the whole wave animation takes */
	@property({type: Number}) time: number = 2;

	@internalProperty() _loadingLetters: LetterConfig[] = [];

	connectedCallback(): void {
		super.connectedCallback();
		// todo: maybe change this number based on screensize
		const numberOfLetters = 750;
		this._loadingLetters = Array.from(
			{ length: numberOfLetters }, () => this._createLetter());
	}

	/** Create a random letter to form one small part of the wave */
	_createLetter(): LetterConfig {
		const x = Random(-1, 101);
		const y = Random(-1, 101);

		const letter = this._randomLetter(x);
		const delay = this._computeDelay(x, y);

		return {
			letter, x, y, delay
		};
	}

	/** Pick a letter from the word.
	 * With it more likely to be from the start of the word when x is low
	 * and more likely to be from the end of the word when x is high */
	_randomLetter(x: number): string {
		const screenSectionLength = 100/this.word.length;
		
		let index = Math.floor(x/screenSectionLength);
		index += RandomInt(-1, 1, 2.5);
		
		// try fix out of bounds indexes
		if (index < 0) {
			index += RandomInt(1,2)
		}
		if (index > this.word.length) {
			index -= RandomInt(1,2)
		}
		
		const possibleLetters = this.word.split('');
		const letter = possibleLetters[index];

		// try again if still out of bounds
		if (!letter) {
			return this._randomLetter(x);
		}
		return letter;
	}

	/** Larger x and y's give longer delays, this gives it the wave animation.
	 * Extra randomness gives it a shimmer */
	_computeDelay(x: number, y: number): number {
		const wavesOnScreen = .5;
		const delayFraction = (x+(y/3)) * wavesOnScreen + Random(-this.time/2, this.time/2);
		const delay = delayFraction*this.time/100;
		// todo: probably put more explanation here/Maths Yo
		return delay;
	}

	_renderLetter(letter: LetterConfig): TemplateResult {
		const position = styleMap({
			left: `${letter.x}%`,
			bottom: `${letter.y}%`
		});
	
		const opacity = styleMap({
			animationDelay: `${letter.delay}s`,
			animationDuration: `${this.time}s`,
		});

		return html`
			<div class="position" style=${position}>
				<div class="opacity" style=${opacity}>
					<div class="letter">${letter.letter}</div>
				</div>
			</div>`;
	}

	render() {
		const letters = this._loadingLetters.map(letter => this._renderLetter(letter));
		return html`
			<div class="letters-container">
				<div class="word">${this.word}...</div>
				${letters}
			</div>
		`;
	}
}
