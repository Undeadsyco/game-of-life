
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import CellManager from "../script-nodes/object-managers/CellManager";
/* START-USER-IMPORTS */
import { cellType } from "../../types";
/* END-USER-IMPORTS */

export default class Cell extends Phaser.GameObjects.Rectangle {

	constructor(scene: Phaser.Scene, x?: number, y?: number, width?: number, height?: number) {
		super(scene, x ?? 0, y ?? 0, width ?? 10, height ?? 10);

		this.isFilled = true;
		this.isStroked = true;
		this.strokeColor = 7039851;

		// cellManager
		const cellManager = new CellManager(this);

		this.cellManager = cellManager;

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.id = `${x}-${y}`;
		this.setPosition(this.adjustForGrid(x!), this.adjustForGrid(y!));
		this.cellManager.initEvents();

		/* END-USER-CTR-CODE */

		// custom definition props
		this.state = "1";
		this.id = "";
	}

	private cellManager: CellManager;

	/* START-USER-CODE */

	// Write your code here.

	private _id!: string;
	get id(): string { return this._id; }
	set id(val: string) { this._id = val; }
	setId(val: string): this {
		this._id = val;
		return this;
	}

	override state: cellType = "0";
	override setState(value: cellType): this {
		this.state = value;
		this.setColor();
		return this
	}

	private activeColor: number = 0x000000;
	private disactiveColor: number = 0xffffff;

	private setColor() {
		if (this.state === "0") {
			this.setFillStyle(this.activeColor)
		} else {
			this.setFillStyle(this.disactiveColor)
		}
	}

	private adjustForGrid(val: number) {
		return val * this.width + (this.width / 2);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
