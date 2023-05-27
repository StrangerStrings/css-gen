import { css, customElement, html, internalProperty, LitElement, property, TemplateResult } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { styleMap } from 'lit-html/directives/style-map';
import { Random, RandomElement } from "../Randomizer";

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
				opacity: 0.8;
				font-size: 4.2rem;
				letter-spacing: 0.7rem;
			}
			
		`
	];

	@property({type: String}) word: string = "Loading";
	@property({type: Number}) time: number = 2;

	@internalProperty() _loadingLetters: LetterConfig[] = [];

	connectedCallback(): void {
		super.connectedCallback();
		const numberOfLetters = 750;
		this._loadingLetters = Array.from(
			{ length: numberOfLetters }, () => this._createLetter());
	}

	/** Maths Yo */
	_createLetter(): LetterConfig {
		const x = Random(-3, 103);
		const y = Random(-3, 103);

		const max = this.time;
		const wavesOnScreen = .5;
		const delayFraction = (x+(y/3)) * wavesOnScreen + Random(-max/2, max/2);

		const delay = delayFraction*max/100;

		const word = this.word
		const letter = RandomElement(word.split(''));

		return {
			letter, x, y, delay
		};
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
