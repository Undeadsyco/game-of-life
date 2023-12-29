
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
import button from "../../prefabs/buttons/Button";
/* START-USER-IMPORTS */
import { EventCenter } from "../../utils";
/* END-USER-IMPORTS */

export default class ButtonManager extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */

		// custom definition props
		this.callback = () => { };
	}

	/* START-USER-CODE */

	// Write your code here.

	override get gameObject() {
		return super.gameObject as button
	}

	private _callback!: () => void;
	get callback(): () => void { return this._callback; }
	set callback(callback: () => void) {
		this.gameObject.off(Phaser.Input.Events.POINTER_DOWN, this._callback, this);
		this._callback = callback;
		this.gameObject.on(Phaser.Input.Events.POINTER_DOWN, this._callback, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
