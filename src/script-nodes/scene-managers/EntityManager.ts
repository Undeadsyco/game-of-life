
// You can write more code here

export const entityManagerEvents = {
	addCell: "add-cell",
} as const;

/* START OF COMPILED CODE */

import ScriptNode from "../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import LevelManager from "./LevelManager";
import Cell from "../../prefabs/Cell";
import { EventCenter } from "../../utils";
import { cellType } from "../../../types";
/* END-USER-IMPORTS */

export default class EntityManager extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.initEvents();
		this.cells = this.scene.add.group();

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	private cells!: Phaser.GameObjects.Group;

	override get parent() {
		return super.parent as LevelManager;
	}

	private addCell({ x, y, value }: { x: number, y: number, value: cellType }) {
		const cell = new Cell(this.scene, x, y)
			.setState(value)
			.setId(`${x}-${y}`);
		this.cells.add(cell, true);
	}

	protected initEvents() {
		EventCenter.emitter.on(`${this.scene.scene.key}-${entityManagerEvents.addCell}`, this.addCell, this);
	}

	protected override destroy(): void {
		EventCenter.emitter.off(`${this.scene.scene.key}-${entityManagerEvents.addCell}`, this.addCell, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
