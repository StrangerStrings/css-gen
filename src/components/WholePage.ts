import { css, customElement, html, internalProperty, LitElement }
from "lit-element";
import '@material/mwc-icon';
import { styleMap } from 'lit-html/directives/style-map';
	
import {defaultStyles} from '../defaultStyles';
import './CssDoodle';
import './Setup';
import './ApiInput';
import './LoadingLetters';
import './PatternEditor';
import './DrumEditor';
import { SetupPage } from "./Setup";
import { Doodle } from "../types";
import { Random } from "../Randomizer";
import { Metronome } from "../Metronome";
import { Drum, DrumMachine, DrumPattern } from "../DrumMachine";
import { PatternEditor } from "./PatternEditor";

@customElement('whole-page')
/**
 * Recieves doodles from Setup cmp and listens to keypresses
 * and then renders relevant doodle on screen 
 */
export class WholePage extends LitElement {

	static styles = [
		defaultStyles,
		css`
			:host {
				cursor: none;
			}
			.doodle-container {
				position: relative;
				height: 100%;
				width: 100%;
				overflow: hidden;
			}
			[hidden] {
				display: none;
			}
		`
	];

	
	doodlesBatch: 1|2 = 1;
	maxDoodles = 30;

	metronome: Metronome;
	drumMachine: DrumMachine;
	@internalProperty() _showDrumEditor: boolean = true;
	@internalProperty() _currentBeat?: number;
	
	doodlesPool: Doodle[] = [];
	@internalProperty() doodles1: Doodle[] = [];
	@internalProperty() doodles2: Doodle[] = [];

	@internalProperty() _background?: string;
	
	constructor() {
		super();
		this.metronome = new Metronome(240, (beat: number) => this._beat(beat));
		this.drumMachine = new DrumMachine();
	}

	connectedCallback(): void {
		super.connectedCallback();
  	window.addEventListener('keyup', this._onKeyPress.bind(this));
	}

	_start (ev: Event) {
		const setup = ev.target as SetupPage;
		this._background = setup.settings.background;
		this.doodlesPool = setup.settings.doodles;

		this.metronome.start();
	}

	_onKeyPress(ev: KeyboardEvent) {
		if (ev.key == ' ') {
			this.metronome.stopstart();
			this._currentBeat = undefined;
			return;
		}

		const shift = ev.shiftKey ? 0.07 : (ev.altKey ? 1 : 0.23) ;
		if (ev.key == 'ArrowLeft') {
			this.metronome.shift(-shift);
			return;
		}
		if (ev.key == 'ArrowRight') {
			this.metronome.shift(shift);
			return;
		}

		const tempoChange = ev.shiftKey ? 0.1 : 1;
		if (ev.key == 'ArrowDown') {
			this.metronome.changeBpm(-tempoChange);
			return;
		}
		if (ev.key == 'ArrowUp') {
			this.metronome.changeBpm(tempoChange);
			return;
		}
		
		if (ev.key == '.') {
			this._showDrumEditor = !this._showDrumEditor
			return;
		}

		if (ev.key == ']') {
			this.drumMachine.doublePatternLength();
			const editor = this.shadowRoot.querySelector<PatternEditor>('pattern-editor');
			editor.drumPattern = this.drumMachine.pattern;
			const beatsInLoop = this.metronome._beatsInLoop;
			this.metronome.beatsInLoop(beatsInLoop * 2);
			return;
		}

		if (ev.key == '[') {
			this.drumMachine.halfPatternLength();
			const editor = this.shadowRoot.querySelector<PatternEditor>('pattern-editor');
			editor.drumPattern = this.drumMachine.pattern;
			const beatsInLoop = this.metronome._beatsInLoop;
			this.metronome.beatsInLoop(beatsInLoop / 2);
			return;
		}

		
		this._dooDle(ev.key);
	}

	/** Main function: Creates new doodle, adds it to the screen, manages batches */
	_dooDle(letter: string) {
		let doodle = this.doodlesPool.find(ky => ky.letter == letter);
		if (!doodle) {
			return;
		}
		doodle = this._alterPosition(doodle);
		
		const doodlesBatch = this._getCurrentBatch();
		doodlesBatch.push(doodle);

		if (doodlesBatch.length >= this.maxDoodles) {
			this._switchBatchAndClearDoodles();
		} 

		this.doodles1 = [...this.doodles1];
		this.doodles2 = [...this.doodles2];
	}

	/** Changing it's position randomly with each key press
		whilst keeping it 'magnetically' drawn to it's initial position (maths yo) */
	_alterPosition(doodle: Doodle): Doodle {
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

	_drumMachineChanged(ev: CustomEvent<DrumPattern>) {
		this.drumMachine.pattern = ev.detail;
	}

	_instrumentsChanged(ev: CustomEvent<Drum[]>) {
		this.drumMachine.drums = ev.detail;
	}

	_beat(beat: number) {
		this._currentBeat = beat;

		const drumsToPlay = this.drumMachine.onthebeat(beat);
		for (const drum of drumsToPlay) {
			this._dooDle(drum.letter);
		}
	}

	render() {
		if (!this.doodlesPool.length) {
			return html`<set-up @its-time=${this._start}></set-up>`;
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
			</div>
			<pattern-editor
				?hidden=${!this._showDrumEditor}
				@settings-changed=${this._drumMachineChanged}
				currentBeat=${this._currentBeat}
				@instruments-changed=${this._instrumentsChanged}
			></pattern-editor>
			`;
	}
}
