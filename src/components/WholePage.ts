import { css, customElement, html, internalProperty, LitElement, property }
	from "lit-element";
import {defaultStyles} from '../defaultStyles';
import { styleMap } from 'lit-html/directives/style-map';

import './CssDoodle';
import './Setup';
import './LoadingLetter';
import { SetupPage } from "./Setup";
import { Doodle, Output } from "../types";

@customElement('whole-page')
/**
 * The Page which will contain and surround our components
 */
export class WholePage extends LitElement {

	static styles = [
		defaultStyles,
		css`
			.page {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: stretch;
				background: black;
				overflow: hidden;
			}
			.doodle-container {
				height: 100%;
				width: 100%;
			}
			.container {
			}
		`
	];

	@internalProperty() _input?: Output;

	doodlesBatch: 1|2 = 1;
	maxDoodles = 20;

	@internalProperty() doodles1: Doodle[] = [];
	@internalProperty() doodles2: Doodle[] = [];

	connectedCallback(): void {
		super.connectedCallback();
  	window.addEventListener('keypress', this._funky.bind(this));
	}

	/** Main function: Creates new doodle, adds it to the screen, manages batches */
	_funky(ev: KeyboardEvent) {
		if (!this._input) {
			return;
		}
		const newDoodle = this._createDoodle(ev.key);
		if (!newDoodle) {
			return;
		}
		
		const doodlesBatch = this.getCurrentBatch();
		doodlesBatch.push(newDoodle);

		if (doodlesBatch.length >= this.maxDoodles) {
			this.switchBatchAndClearDoodles();
		} 

		this.doodles1 = [...this.doodles1];
		this.doodles2 = [...this.doodles2];
	}

	switchBatchAndClearDoodles() {
		this.doodlesBatch = this.doodlesBatch == 1 ? 2 : 1;

		const batchToEmpty = this.getCurrentBatch();
		batchToEmpty.length = 0;
	}

	getCurrentBatch(): Doodle[] {
		if (this.doodlesBatch == 1) {
			return this.doodles1;
		} else if (this.doodlesBatch == 2) {
			return this.doodles2;
		}
	}

	_createDoodle(key: string): Doodle|undefined {
		const doodle = this._input.keys.find(ky => ky.letter == key);
		return doodle;
	}

	_go (ev: Event) {
		console.log('go1');
		
		const setup = ev.target as SetupPage;
		this._input = setup.output
		console.log(this._input);
	}

	_renderContent() {
		if (!this._input) {
			return html`<set-up @its-time=${this._go}></set-up>`;
		}

		const background = styleMap({background: `${this._input.background}`});
		
		var doodles1 = this.doodles1.map(doodle => 
			html`<css-doodle .data=${doodle}></css-doodle>`);
			var doodles2 = this.doodles2.map(doodle => 
				html`<css-doodle .data=${doodle}></css-doodle>`);
				
			console.log(this.doodles1);
				
		return html`
			<div class="doodle-container" style=${background}>
				${doodles1}
				${doodles2}
			</div>`;
	}

	render() {
		return html`
			<div class="page">
				${this._renderContent()}
			</div>
		`;
	}
}
