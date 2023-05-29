import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { ChatGpt } from "../chatGpt/ChatGpt";
import { styleMap } from 'lit-html/directives/style-map';
import { Doodle, Palette } from "../types";

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
				padding: 5rem;
				background: black;
				width: 100%;
				height: 100%;
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
				font-size: 3.2rem;
			}
			.colours-container {
				display: flex;
				flex-direction: column;
				gap: 1.5rem;
				padding: 1rem;
				border: 2px solid ;
				border-radius: 1rem;
				min-height: 26.3rem;
				min-width: 25.2rem;
			}
			.palette {
				display: flex;
				gap: .6rem;
				padding: 1rem;
				margin: 1rem;
				border-radius: 1rem;
				cursor: pointer;
				transition: all .05s ease-in-out;
			}
			.palette:hover {
				padding: 1.2rem;
				margin: 0.8rem;
			}
			.swatch {
				height: 3rem;
				width: 3rem;
				border-radius: 10%;
				transition: opacity .15s ease-in;
				opacity: 0.9;
			}
			.palette:hover .swatch{
				opacity: 1;
			}
			.instructions {
				font-size: 2rem;
			}
			.hidden {
				display: none;
			}
			loading-letters {
				--color: var(--grey);
			}
		`
	];

	@property({type: Object}) settings: {background: string, doodles: Doodle[]};

	@internalProperty() _chatGpt?: ChatGpt;
	@internalProperty() _loading: number = 1;
	@internalProperty() _colours: Palette[] = [];
	@internalProperty() _inspiration: string[] = [];
	@internalProperty() _debugMode: boolean = true;

	connectedCallback(): void {
		super.connectedCallback();
		this._chatGpt = new ChatGpt('b');
		this._getColours();
	}

	async _getColours() {
		this._loading = 1;
		this._colours = await this._chatGpt.getColours(2 );		
		this._loading = 0;
	}

  async _generateDoodles(ev: MouseEvent) {
		const element = ev.target as HTMLElement;
		const idx = Number(element.getAttribute('data-idx'));
		const palette = this._colours[idx];
		
		this._loading = 2;
		const css = await this._chatGpt.getDoodles(palette.colours, 13);
		const doodles = this._chatGpt.tempCreateDoodle(css);
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
		return html`${colours}`;
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
				@click=${this._generateDoodles}
				data-idx=${idx}
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

		const hideWhenLoading = this._loading && 'hidden';

		return html`
			<div class="page">
				<h3 class="title">Css Generation</h3>
				<div class="colours-container">
					${this._renderColours()}
				</div>
				<p class="instructions ${hideWhenLoading}">Pick a palette ^</p>
			</div>
		`;
	}
}
