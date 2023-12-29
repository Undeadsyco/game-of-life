
// You can write more code here

export const levelManagerEvents = {
	playGrid: "play-grid",
	pauseGrid: "pause-grid",
	updateText: "update-text",
}

/* START OF COMPILED CODE */

import ScriptNode from "../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
import GridManger, { gridManagerEvents } from "./GridManager";
import EntityManager from "./EntityManager";
/* START-USER-IMPORTS */
import Level from "../../scenes/Level";
import { EventCenter } from "../../utils";
import { stateType } from "../../../types";
/* END-USER-IMPORTS */

export default class LevelManager extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		// gridManger
		new GridManger(this);

		// entityManager
		new EntityManager(this);

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.initEvents();

		this._rowCount = this.scene.scale.width / this.cellSize - 20;
		this._columnCount = (this.scene.scale.height / this.cellSize);

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	override get parent() {
		return super.parent as Level;
	}

	private _state: stateType = "pause";
	get state() { return this._state; }
	set state(val: stateType) { this._state = val; }
	setState(val: stateType): this {
		this._state = val;
		return this;
	}

	private _cellSize = 10;
	public get cellSize() { return this._cellSize; }

	private _rowCount!: number;
	public get rowCount() { return this._rowCount; }

	private _columnCount!: number;
	public get columnCount() { return this._columnCount; }

	private _timer = 0;
	get timer(): number { return this._timer; }
	set timer(val: number) { this._timer = val; }

	protected update(): void {
		if (this._state === "play") {
			if (this._timer < 1000 / 8) {
				this._timer += this.scene.game.loop.delta;
			} else {
				EventCenter.emitter.emit(`${this.scene.scene.key}-${gridManagerEvents.stepGrid}`);
				this._timer = 0;
			}
		}
	}

	private updateTexts({ living, dead }: { living: number, dead: number }) {
		const { livingText, deadText } = this.parent.texts;

		livingText.setText(`living:\n${living}`);
		deadText.setText(`dead:\n${dead}`);
	}

	private initEvents() {
		EventCenter.emitter.on(`${this.scene.scene.key}-${levelManagerEvents.playGrid}`, () => { this.setState("play") }, this);
		EventCenter.emitter.on(`${this.scene.scene.key}-${levelManagerEvents.pauseGrid}`, () => { this.setState("pause") }, this);
		EventCenter.emitter.on(`${this.scene.scene.key}-${levelManagerEvents.updateText}`, this.updateTexts, this);
	}

	protected override awake() {
		this.parent.buttons.playBtn.manager.callback = () => {
			EventCenter.emitter.emit(`${this.scene.scene.key}-${levelManagerEvents.playGrid}`);
		}

		this.parent.buttons.pauseBtn.manager.callback = () => {
			EventCenter.emitter.emit(`${this.scene.scene.key}-${levelManagerEvents.pauseGrid}`);
		}

		this.parent.buttons.randBtn.manager.callback = () => {
			EventCenter.emitter.emit(`${this.scene.scene.key}-${gridManagerEvents.randomizeGrid}`);
		}

		this.parent.buttons.clearBtn.manager.callback = () => {
			this.state = "pause";
			EventCenter.emitter.emit(`${this.scene.scene.key}-${gridManagerEvents.clearGrid}`);
		}
	}

	protected override destroy(): void {
		EventCenter.emitter.off(`${this.scene.scene.key}-${levelManagerEvents.playGrid}`, () => { this.setState("play") }, this);
		EventCenter.emitter.off(`${this.scene.scene.key}-${levelManagerEvents.pauseGrid}`, () => { this.setState("pause") }, this);
		EventCenter.emitter.on(`${this.scene.scene.key}-${levelManagerEvents.updateText}`, this.updateTexts, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
