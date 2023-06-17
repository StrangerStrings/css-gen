import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { DrumPattern, pattern1 } from "../DrumMachine";
import { defaultStyles } from "../defaultStyles";
/**
 * a full screen loading page with randomly generated letters
 * that fade in and out, like a wave
 */
@customElement("drum-editor")
export class DrumEditor extends LitElement{
	
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
		}
		.grid {
			display: flex;
			gap: 5px;
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

	_settingsChanged() {
		this.dispatchEvent(new CustomEvent<DrumPattern>(
							'settings-changed', {detail: this.drumPattern}));
	}

	_toggleDrum(x: number, y: number) {
		this.drumPattern[x][y] = !this.drumPattern[x][y];
		this.drumPattern = [...this.drumPattern];

		this._settingsChanged()
	}

	render() {
		const columns = this.drumPattern.map((beat, x) => {
			const instrumentColumn = beat.map((drumPad, y) => 
				html`
					<div class='drum-pad' 
						?data-on=${drumPad}
						?data-current-beat=${x+1 == this.currentBeat}
						@click=${() => this._toggleDrum(x, y)}
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
