import { css, customElement, html, internalProperty, LitElement, property }
	from "lit-element";
import {defaultStyles} from '../defaultStyles';
import { styleMap } from 'lit-html/directives/style-map';

import './CssDoodle';
import './Setup';
import './LoadingLetters';
import { SetupPage } from "./Setup";
import { Doodle } from "../types";
import { Random } from "../Randomizer";

@customElement('whole-page')
/**
 * Recieves doodles from Setup cmp and listens to keypresses
 * and then renders relavant doodle on screen 
 */
export class WholePage extends LitElement {

	static styles = [
		defaultStyles,
		css`
			.doodle-container {
				position: relative;
				height: 100%;
				width: 100%;
				overflow: hidden;
			}
		`
	];

	
	doodlesBatch: 1|2 = 1;
	maxDoodles = 30;
	
	doodlesPool: Doodle[] = [];
	@internalProperty() doodles1: Doodle[] = [];
	@internalProperty() doodles2: Doodle[] = [];

	@internalProperty() _background?: string;

	connectedCallback(): void {
		super.connectedCallback();
  	window.addEventListener('keypress', this._dooDle.bind(this));
	}

	/** Main function: Creates new doodle, adds it to the screen, manages batches */
	_dooDle(ev: KeyboardEvent) {
		const newDoodle = this._createDoodle(ev.key);
		if (!newDoodle) {
			return;
		}
		
		const doodlesBatch = this._getCurrentBatch();
		doodlesBatch.push(newDoodle);

		if (doodlesBatch.length >= this.maxDoodles) {
			this._switchBatchAndClearDoodles();
		} 

		this.doodles1 = [...this.doodles1];
		this.doodles2 = [...this.doodles2];
	}

	_createDoodle(key: string): Doodle|undefined {
		const doodle = this.doodlesPool.find(ky => ky.letter == key);

		// changing it's position randomly with each key press
		// but keeping it 'magnetically' drawn to it's initial position (maths yo)
		const variance = 8;

		const xMovement = doodle.xInitial - doodle.x;
		doodle.x += Random((-variance+xMovement), (variance+xMovement), variance/3);

		const yMovement = doodle.yInitial - doodle.y;
		doodle.y += Random((-variance+yMovement), (variance+yMovement), variance/3);

		return doodle;
	}

	_switchBatchAndClearDoodles() {
		this.doodlesBatch = this.doodlesBatch == 1 ? 2 : 1;

		const batchToEmpty = this._getCurrentBatch();
		batchToEmpty.length = 0;
	}

	_getCurrentBatch(): Doodle[] {
		if (this.doodlesBatch == 1) {
			return this.doodles1;
		} else if (this.doodlesBatch == 2) {
			return this.doodles2;
		}
	}

	_go (ev: Event) {
		const setup = ev.target as SetupPage;
		this._background = setup.settings.background;
		this.doodlesPool = setup.settings.doodles;
	}

	render() {
		if (!this.doodlesPool.length) {
			return html`<set-up @its-time=${this._go}></set-up>`;
		}

		const background = styleMap({background: `${this._background}`});
		
		var doodles1 = this.doodles1.map(doodle => 
			html`<css-doodle .data=${doodle}></css-doodle>`);
		var doodles2 = this.doodles2.map(doodle => 
			html`<css-doodle .data=${doodle}></css-doodle>`);
				
		return html`
			<div class="doodle-container" style=${background}>
				${doodles1}
				${doodles2}
			</div>`;
	}
}
