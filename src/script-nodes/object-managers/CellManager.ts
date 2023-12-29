
// You can write more code here

export const cellManagerEvents = {
	changeState: "change-state",
}

/* START OF COMPILED CODE */

import ScriptNode from "../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import Cell from "../../prefabs/Cell";
import { EventCenter } from "../../utils";
import { gridManagerEvents } from "../scene-managers/GridManager";
import { cellType } from "../../../types";
/* END-USER-IMPORTS */

export default class CellManager extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.gameObject.setInteractive();

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	override get gameObject() { return super.gameObject as Cell; }

	private flipState() {
		let newState!: cellType;
		if (this.gameObject.state === "0") newState = "1";
		else newState = "0";

		this.gameObject.setState(newState);
		const [x, y] = this.gameObject.id.split("-");
		EventCenter.emitter.emit(`${this.scene.scene.key}-${gridManagerEvents.changeCell}`, { x, y, value: newState });
	}

	private changeState(val: cellType) {
		this.gameObject.setState(val);
	}

	initEvents() {
		this.gameObject.on(Phaser.Input.Events.POINTER_DOWN, this.flipState, this);
		EventCenter.emitter.on(`${this.gameObject.id}-${cellManagerEvents.changeState}`, this.changeState, this);
	}

	protected override destroy(): void {
		this.gameObject.off(Phaser.Input.Events.POINTER_DOWN, this.flipState, this);
		EventCenter.emitter.off(`${this.gameObject.id}-${cellManagerEvents.changeState}`, this.changeState, this)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
