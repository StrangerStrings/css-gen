import { css, customElement, html, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { ChatGpt } from "../chatGpt/ChatGpt";
import { styleMap } from 'lit-html/directives/style-map';
import { CssBits, Doodle, Palette } from "../types";
import { RandomElement } from "../Randomizer";

const apiKey = "";

/**
 * Setup page for choosing colours and generating doodles
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
				width: 100%;
				height: 100%;
				padding: 5rem;
				gap: 2.5rem;
				align-items: center;
				overflow: hidden;
				background: black;
				color: var(--grey);
			}
			.title {
				text-align: center;
				font-size: 4rem;
			}
			.loading {
				position: absolute;
				bottom: 50%;
				left: 50%;
				transform: translate(-50%, 50%);
				padding-bottom: 6rem;
				font-size: 3.2rem;
				text-align: center;
			}
			.colours-container {
				display: flex;
				flex-direction: column;
				gap: 2rem;
				padding: 1rem;
			}
			.palette {
				display: flex;
				gap: .6rem;
				margin: 0.2rem;
				padding: 1rem;
				border-radius: 1rem;
				cursor: pointer;
				transition: all .05s ease-in-out;
			}
			.palette:hover,
			.palette:focus {
				margin: 0rem;
				padding: 1.2rem;
			}
			.swatch {
				height: 3rem;
				width: 3rem;
				border-radius: 10%;
				opacity: 0.9;
				transition: opacity .15s ease-in;
			}
			.palette:hover .swatch,
			.palette:focus .swatch {
				opacity: 1;
			}
			.instructions {
				font-size: 2rem;
			}
			api-input,
			loading-letters {
				--color: var(--grey);
			}
		`
	];

	@property({type: Object}) settings: {background: string, doodles: Doodle[]};

	@internalProperty() _chatGpt?: ChatGpt;
	@internalProperty() _loading: number = 1;
	@internalProperty() _colours: Palette[] = [];

	_inspiration: string[] = [];
	/** If true, downloads CSS information. Useful for debugging css parsing issues */
	_debugMode: boolean = false;

	connectedCallback(): void {
		super.connectedCallback();
		if (apiKey) {
			this._initiliseChatGpt(apiKey);
		}
	}
	
	_initiliseChatGpt(apiKey: string) { 
		this._chatGpt = new ChatGpt(apiKey);
	}

  updated(change: PropertyValues): void {
    super.updated(change);
    if (change.has('_chatGpt') && this._chatGpt) {
			this._getColours();
    }
  }

	/** Generate list of possible colour palettes */
	async _getColours() {
		this._loading = 1;
		this._colours = await this._chatGpt.generateColours(3);		
		this._loading = 0;
	}

	/** Generate the doodles and start the visualizer */
  async _getDoodles(ev: MouseEvent) {
		const target = ev.target as HTMLElement;
		const paletteElement = target.closest('.palette');
		const idx = paletteElement?.getAttribute('data-idx');
		if (!paletteElement || !idx || isNaN(Number(idx))) {
			return;
		}
		const palette = this._colours[Number(idx)];
		
		this._loading = 2;
		const css = await this._chatGpt.generateCss(palette.colours, 10);
		const doodles = this._createDoodles(css);
		this._loading = 0;

		if (this._debugMode) {
			for (const doodle of doodles) {
				this._downloadCss(doodle)
			}
		}

		this.settings = {
			background: palette.background,
			doodles
		};
		this.dispatchEvent(new CustomEvent('its-time'));
	}

	/** Create all doodle object from the generated and parsed Css */
	_createDoodles(cssBits: CssBits[]): Doodle[] {
		const doodles: Doodle[] = [];
		const letters = [
			'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
		];
		for (let i = 0; i < letters.length; i++) {
			const letter = letters[i];
			const [x, y] = this._computeCoordinates(letter);

			let css = cssBits[i];
			if (!css) {
				css = RandomElement(cssBits);
			}
			doodles.push({letter, ...css,
				 x, xInitial: x, y, yInitial: y});
		}
		return doodles;
	}

	/** position doodles on screen by their letter's position on the keyboard */
	_computeCoordinates(letter: string): [number, number] {
		// upside down layout - so 0 index is at bottom of screen
		const keyboard = [
			['z','x','c','v','b','n','m',''],
			['a','s','d','f','g','h','j','k','l'],
			['q','w','e','r','t','y','u','i','o','p']
		];

		for (let rowIdx = 0; rowIdx < keyboard.length; rowIdx++) {
			const row = keyboard[rowIdx];
			const keyIdx = row.indexOf(letter);
			if (keyIdx !== -1) {
				const y = (rowIdx+1)/(keyboard.length+0.5);
				const x = (keyIdx+1)/(row.length+0.5);
				return [x*100, y*100];
			}
		}
		//should never reach here
		return [50, 50];
	}

	/** Download useful css info in a text file */
	_downloadCss(doodle: Doodle) {
		let keys = ['rawCss', 'css', 'cssClass', 'cssClassInner','timing', 'letter'];
		let values = keys.map(key => doodle[key]);
		let data = values.join('\n- - - - - - - - - - - - - - - - - - - - -\n');
		let blob = new Blob([data], { type: 'text/plain' });
		let url = URL.createObjectURL(blob);

		let link = document.createElement('a');
		const fileName = doodle.cssClass || 'cssFile';
		link.download = fileName+'.txt';
		link.href = url;
		link.click();
	}

	_renderColours() {
		if (this._loading > 0) {
			return html`<div class="loading">Loading...</div>`;
		}
		
		const colours = this._colours.map((c, i) => this._renderPalette(c, i));
		return html`
			<div class="colours-container">
				${colours}
			</div>
			<p class="instructions">Pick a palette</p>`;
	}

	_renderPalette(palette: Palette, idx: number) {
		const swatches = palette.colours.map(colour => html`
			<div class="swatch"
				style=${styleMap({
					background: colour
				})}>
			</div>`);

		return html`
			<div class="palette"
				@click=${this._getDoodles}
				@keyup=${(ev) => {if (ev.key == 'Enter') this._getDoodles(ev);}}
				data-idx=${idx}
				tabindex=${idx+1}
				style=${styleMap({
					background: palette.background
				})}>
				${swatches}
			</div>`;
	}

	render() {
		if (this._loading == 2) {
			return html`
				<loading-letters
					time=${4}
				></loading-letters>`;
		}

		if (!this._chatGpt) {
			return html`<div class="page">
				<api-input 
					@api-key=${(ev: CustomEvent<string>) => this._initiliseChatGpt(ev.detail)}>
				</api-input>
			</div>`
		}

		return html`
			<div class="page">
				<h3 class="title">Css Generation</h3>
				${this._renderColours()}
			</div>
		`;
	}
}
