import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { ChatGpt } from "../chatGpt/ChatGpt";
import { styleMap } from 'lit-html/directives/style-map';
import { Doodle, Output, Palette } from "../types";
import { parseColours, parseCss, parseCssClass } from "../chatGpt/Parsing";
import { coloursRequest, cssRequestTemplate } from "../chatGpt/Requests";
// import { RandomElement } from "../Randomizer";
import { createLetter, LetterConfig } from "./LoadingLetter";
import { Random, RandomElement } from "../Randomizer";

const letters = [
	'a'
	,'b'
	,'c'
	,'d'
	,'e'
	,'f'
	,'g','h','i','j'
]

/**
 * Just one configurable component for use and reuse
 */
@customElement("set-up")
export class SetupPage extends LitElement{
	static styles = [
		defaultStyles,
		css`
			:host {
				--grey: #575757;	
			}
			.page {
				display: flex;
				flex-direction: column;
				padding: 5rem;
				width: 100%;
				gap: 2rem;
				align-items: center;
				color: var(--grey);
				overflow: hidden;
			}
			.title {
				text-align: center;
				font-size: 4rem;
			}
			.loading {
				text-align: center;
				font-size: 5rem;
			}
			.colours-container {
				display: flex;
				flex-direction: column;
				gap: 3.5rem;
				padding: 2rem;
				border: 2px solid ;
				border-radius: 1rem;
				min-height: 26.3rem;
				min-width: 25.2rem;
			}
			.palette {
				display: flex;
				gap: .6rem;
				padding:1rem;
				border-radius: 1rem;
				cursor: pointer;
			}
			.palette:hover {
				border: 10px solid darkgray solid;
			}
			.swatch {
				height: 3rem;
				width: 3rem;
			}
			.instructions {
				font-size: 2rem;
			}

			.loading-letters-container {
				left: 0;
				top: 0;
				height: 100%;
				width: 100%;
				position: absolute;
				overflow: hidden;
			}
			.loading-letters {
				height: 100%;
				width: 100%;
				position: relative;
			}
			loading-letter {
				--color: var(--grey)
			}
		`
	];

	@property({type: Object}) output: Output;

	@internalProperty() _chatGpt?: ChatGpt;
	@internalProperty() _loading: number = 0;
	@internalProperty() _colours: Palette[] = [];
	@internalProperty() _inspiration: string[] = [];

	_loadingLetters: LetterConfig[] = 
						Array.from({ length: 750 }, () => createLetter());

	connectedCallback(): void {
		super.connectedCallback();
		this._chatGpt = new ChatGpt('b');
		this._getColours();
	}

	async _getColours() {
		this._loading = 1;


		// const coloursResponse = await this._chatGpt.chat(coloursRequest);
		const colours = parseColours();
		this._colours = colours;

		console.log(this._loadingLetters.filter(i => i.x < 10 && i.y < 10))


		this._loading = 0;
	}

  private async onClick(ev: MouseEvent) {
		this._loading = 2;

		const element = ev.target as HTMLElement;
		const idx = Number(element.getAttribute('data-idx'));
		const palette = this._colours[idx];
    // await new Promise((resolve) => setTimeout(resolve, 2000));

		const doodles: Doodle[] = [];

		const promises = [];
		letters.forEach((letter, idx) => {
			const promise = new Promise(async (resolve) => {
				const colours = [
					RandomElement(palette.colours),
					RandomElement(palette.colours),
					RandomElement(palette.colours)
				];
				const inspiration = this._inspiration[idx]
				const doodle = await this._createSingleOutput(letter, colours, inspiration)
				
				doodles.push(doodle)
				resolve(null);
			});
			promises.push(promise)
		});

		await Promise.all(promises);

		this.output = {
			background: palette.background,
			keys: doodles
		};
		
		this.dispatchEvent(new CustomEvent('its-time'));

		this._loading = 0;
	}

	async _createSingleOutput(
		letter: string, colours: string[], inspiration?: string
	): Promise<Doodle> {
		const cssRequest = cssRequestTemplate(colours, inspiration);
		// const cssResponse = await this._chatGpt.chat(cssRequest);

		const css = parseCss(letter);
		// console.log(css);
		
		const cssClass = parseCssClass(css);
		//const cssClass = 'animated-shape';

		const [x, y] = this._computeCoordinates();
		
		return {
			letter, css, cssClass, x, y
		};
	}

	_computeCoordinates(): [number, number] {
		return [Random(10,90), Random(10,90)];
	}

	_renderColours() {
		if (this._loading > 0) {
			return html`<div class="loading">Loading...</div>`;
		}
		const colours = this._colours.map((c, i) => this._renderPalette(c, i));
		return html`${colours}`;
	}

	_renderPalette(palette: Palette, idx: number) {
		const swatches = palette.colours.map(col => html`
			<div class="swatch"
				style=${styleMap({
					background: col
				})}>
			</div>`);

		return html`
			<div class="palette"
				@click=${this.onClick}
				data-idx=${idx}
				style=${styleMap({
					background: palette.background
				})}>
			${swatches}
		</div>`;
	}

	_renderLoadingBackground() {
		if (this._loading < 2) {
			return;
		}

		const letters = this._loadingLetters.map(letter => html`
			<loading-letter
			letter=${letter.letter}
			x=${letter.x}
				y=${letter.y}
				time=${letter.time}
				delay=${letter.delay}
			></loading-letter>
		`);

return html`
<div class="loading-letters-container">
<div class="loading-letters">
	${letters}
</div>
</div>
		`
	}

	render() {
		return html`
			<div class="page">
				<h3 class="title">Css Visuals Generation</h3>
				<div class="colours-container">
					${this._renderColours()}
				</div>
				<p class="instructions">Pick a palette ^</p>
			</div>
			${this._renderLoadingBackground()}
		`;
	}

}
