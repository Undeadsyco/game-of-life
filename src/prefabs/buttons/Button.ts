
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import ButtonManager from "../../script-nodes/object-managers/ButtonManager";
/* START-USER-IMPORTS */
import { buttonType } from "../../../types";
/* END-USER-IMPORTS */

export default class Button extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// background
		const background = scene.add.rectangle(0, 0, 40, 40);
		background.isFilled = true;
		background.fillColor = 7434609;
		background.isStroked = true;
		background.strokeColor = 4276545;
		background.lineWidth = 2;
		this.add(background);

		// _buttonManager
		const _buttonManager = new ButtonManager(this);

		this.background = background;
		this._buttonManager = _buttonManager;

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.setSize(100, 40);
		this.setInteractive();

		/* END-USER-CTR-CODE */

		// custom definition props
		this.btnType = "play";
	}

	public background: Phaser.GameObjects.Rectangle;
	private _buttonManager: ButtonManager;

	/* START-USER-CODE */

	// Write your code here.

	get manager() { return this._buttonManager; }

	private _btnType!: buttonType;
	get btnType(): buttonType { return this._btnType; }
	set btnType(val: buttonType) { this._btnType = val; } 

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
