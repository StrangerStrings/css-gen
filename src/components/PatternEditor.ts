import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { Drum, DrumPattern, drums1, pattern1 } from "../DrumMachine";
import { defaultStyles } from "../defaultStyles";
import { styleMap } from 'lit-html/directives/style-map';

/**
 * a full screen loading page with randomly generated letters
 * that fade in and out, like a wave
 */
@customElement("pattern-editor")
export class PatternEditor extends LitElement{
	
	static styles = [
		defaultStyles,
		css`
		:host {
			position: absolute;
			top: 0;
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			opacity: 0.7;
		}
		.container {
			cursor: default;
			padding: 50px;
		}
		.grid {
			display: flex;
			gap: 5px;
			max-width: 90vw;
			overflow-x: auto;
		}
		.col {
			display: flex;
			flex-direction: column;
			gap: 5px;
		}
		.drum-pad {
			height: 100px;
			width: 50px;
			background: whitesmoke;
			opacity: 0.5;
		}
		.drum-pad[data-on] {
			opacity: 0.8;
		}
		.drum-pad[data-current-beat] {
			opacity: 0.6;
		}
		.drum-pad[data-on][data-current-beat] {
			opacity: 0.9;
		}
		`
	];

	@property() currentBeat?: number;
	@internalProperty() drumPattern: DrumPattern = pattern1;
	@internalProperty() drums: Drum[] = drums1;
	
	@internalProperty() _instrumentEdit?: number;

	_settingsChanged() {
		this.dispatchEvent(new CustomEvent<DrumPattern>(
							'settings-changed', {detail: this.drumPattern}));
	}

	_instrumentChanged(ev: CustomEvent<Drum[]>) {
		// update this.instrument with idx from the target
		// send event out to wholepage
	}

	_notEdit() {
		this._instrumentEdit = undefined;
	}

	_toggleDrum(x: number, y: number, ev: MouseEvent) {
		if (ev.shiftKey) {
			this._instrumentEdit = y;
			return;
		}

		this.drumPattern[x][y] = !this.drumPattern[x][y];
		this.drumPattern = [...this.drumPattern];

		this._settingsChanged()
	}

	render() {
		if (this._instrumentEdit != undefined) {
			return html`
				<div class='container'>
					<drum-editor
						.inst-idx=${this._instrumentEdit}
						.drum=${this.drums[this._instrumentEdit]}
						@drum-changed=${this._instrumentChanged}
						@back=${this._notEdit}
					></drum-editor>
				</div>`;
		}

		const beats = this.drumPattern.length
		const drumPadWidth = beats <= 16 ? 50 : (beats >= 64 ? 25 : 36);
		// if drumPattern.length is 16, it wants to be 50
		// if it's 64 it wants to be 25


		const columns = this.drumPattern.map((beat, x) => {
			const instrumentColumn = beat.map((drumPad, y) => 
				html`
					<div class='drum-pad' 
						?data-on=${drumPad}
						?data-current-beat=${x == this.currentBeat}
						@click=${(ev) => this._toggleDrum(x, y, ev)}
						style=${styleMap({'width': `${drumPadWidth}px`})}
					></div>`
			)
			return html`<div class='col'>${instrumentColumn}</div>`;
		});

		return html`
			<div class='container'>
				<div class='grid'>${columns}</div>
			</div>
		`;
	}
}
