import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { ChatGpt } from "../chatGpt/ChatGpt";
import { styleMap } from 'lit-html/directives/style-map';
import { Doodle, Output, Palette } from "../types";
import { parseColours, parseCss, parseCssClass } from "../chatGpt/Parsing";
import { coloursRequest, cssRequestTemplate } from "../chatGpt/Requests";
import { RandomElement } from "../Randomizer";

const letters = [
	'a','b','c','d','e',
	'f','g','h','i','j'
]

/**
 * Just one configurable component for use and reuse
 */
@customElement("set-up")
export class SetupPage extends LitElement{
	static styles = [
		defaultStyles,
		css`
			.page {
				display: flex;
				flex-direction: column;
				padding: 5rem;
				width: 100%;
				gap: 1rem;
				align-items: center;
				color: darkgray;
			}
			.title {
				text-align: center;
				font-size: 1rem;
			}
			.loading {
				text-align: center;
				font-size: .7rem;
			}
			.colours-container {
				display: flex;
				flex-direction: column;
				gap: .2rem;
				border: 2px solid darkgray solid;
				border-radius: .5rem;
			}
			.palette {
				display: flex;
				gap: .2rem;
				padding: .3rem;
				border: 1px solid darkgray solid;
				border-radius: .3rem;
				cursor: pointer;
			}
			.palette:hover {
				border: 2px solid darkgray solid;
			}
			.swatch {
				height: 1rem;
				width: 1rem;
			}
		`
	];

	@property({type: Object}) output: Output;

	@internalProperty() _chatGpt?: ChatGpt;
	@internalProperty() _loading: boolean = false;
	@internalProperty() _colours: Palette[] = [];
	@internalProperty() _inspiration: string[] = [];

	connectedCallback(): void {
		super.connectedCallback();
		this._chatGpt = new ChatGpt('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');
		this._getColours();
	}

	async _getColours() {
		this._loading = true;

		const coloursResponse = await this._chatGpt.chat(coloursRequest);
		const colours = parseColours(coloursResponse);
		this._colours = colours;

		this._loading = false;
	}

  private async onClick(ev: MouseEvent) {
		this._loading = true;

		const element = ev.target as HTMLElement;
		const idx = Number(element.getAttribute('data-idx'));
		const palette = this._colours[idx];

		const doodles: Doodle[] = [];

		const promises = [];
		letters.forEach((letter, idx) => {
			const promise = async () => {
				const colours = [
					RandomElement(palette.colours),
					RandomElement(palette.colours),
					RandomElement(palette.colours)
				];
				const inspiration = this._inspiration[idx]
				const doodle = await this._createSingleOutput(letter, colours, inspiration)
				doodles.push(doodle)
			}
			promises.push(promise)
		});

		// await promises.all()

		this.output = {
			background: palette.background,
			keys: doodles
		};
		this.dispatchEvent(new CustomEvent('its time'));

		this._loading = false;
	}

	async _createSingleOutput(
		letter: string, colours: string[], inspiration?: string
	): Promise<Doodle> {
		const cssRequest = cssRequestTemplate(colours, inspiration);
		const cssResponse = await this._chatGpt.chat(cssRequest);

		const css = parseCss(cssResponse);
		const cssClass = parseCssClass(css);

		const [x, y] = this._computeCoordinates();
		
		return {
			letter, css, cssClass, x, y
		};
	}

	_computeCoordinates(): [number, number] {
		return [50, 50];
	}

	_renderColours() {
		if (this._loading) {
			return html`<div class="loading">loading...</div>`;
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

	render() {
		return html`
			<div class="page">
				<h3 class="title">Css Visuals Generation</h3>
				<div class="colours-container">
					${this._renderColours}
				</div>
			</div>
		`;
	}

}
