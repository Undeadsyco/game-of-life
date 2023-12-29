
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import Button from "../prefabs/buttons/Button";
import LevelManager from "../script-nodes/scene-managers/LevelManager";
/* START-USER-IMPORTS */
import { EventCenter } from "../utils";
import { levelManagerEvents } from "../script-nodes/scene-managers/LevelManager";
import { gridManagerEvents } from "../script-nodes/scene-managers/GridManager";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// clearBtn
		const clearBtn = new Button(this, 1180, 100);
		this.add.existing(clearBtn);
		clearBtn.background.setSize(200, 40);
		clearBtn.background.updateDisplayOrigin();

		// clearText
		const clearText = this.add.text(-1, -1, "", {});
		clearText.setOrigin(0.5, 0.5);
		clearText.text = "Clear";
		clearText.setStyle({ "fontSize": "20px", "stroke": "#000000ff", "strokeThickness": 1, "shadow.offsetX": -2, "shadow.offsetY": 1, "shadow.color": "#000000ff", "shadow.blur": 1, "shadow.stroke": true });
		clearBtn.add(clearText);

		// randBtn
		const randBtn = new Button(this, 1180, 60);
		this.add.existing(randBtn);
		randBtn.background.setSize(200, 40);
		randBtn.background.updateDisplayOrigin();

		// randText
		const randText = this.add.text(0, 0, "", {});
		randText.setOrigin(0.5, 0.5);
		randText.text = "random";
		randText.setStyle({ "backgroundColor": "", "fontSize": "20px", "stroke": "#000000ff", "strokeThickness": 1, "shadow.offsetX": -2, "shadow.offsetY": 1, "shadow.blur": 1, "shadow.stroke": true });
		randBtn.add(randText);

		// pauseBtn
		const pauseBtn = new Button(this, 1230, 20);
		this.add.existing(pauseBtn);
		pauseBtn.background.setSize(100, 40);
		pauseBtn.background.updateDisplayOrigin();

		// pauseDecal_2
		const pauseDecal_2 = this.add.rectangle(-5, 0, 5, 20);
		pauseDecal_2.isFilled = true;
		pauseDecal_2.isStroked = true;
		pauseDecal_2.strokeColor = 0;
		pauseBtn.add(pauseDecal_2);

		// pauseDecal_1
		const pauseDecal_1 = this.add.rectangle(5, 0, 5, 20);
		pauseDecal_1.isFilled = true;
		pauseDecal_1.isStroked = true;
		pauseDecal_1.strokeColor = 0;
		pauseBtn.add(pauseDecal_1);

		// playBtn
		const playBtn = new Button(this, 1130, 20);
		this.add.existing(playBtn);
		playBtn.background.setSize(100, 40);
		playBtn.background.updateDisplayOrigin();

		// playDecal
		const playDecal = this.add.triangle(0, 0, 0, 20, 0, 0, 20, 10);
		playDecal.isFilled = true;
		playDecal.isStroked = true;
		playDecal.strokeColor = 0;
		playBtn.add(playDecal);

		// deadCount
		const deadCount = this.add.container(1230, 139);

		// deadCountBg
		const deadCountBg = this.add.rectangle(0, 0, 100, 40);
		deadCountBg.isFilled = true;
		deadCountBg.fillColor = 7434609;
		deadCountBg.isStroked = true;
		deadCountBg.strokeColor = 0;
		deadCount.add(deadCountBg);

		// deadCountText
		const deadCountText = this.add.text(0, 0, "", {});
		deadCountText.setOrigin(0.5, 0.5);
		deadCountText.text = "Dead:\n0";
		deadCountText.setStyle({ "align": "center", "stroke": "#000000ff", "strokeThickness": 1, "shadow.offsetX": -2, "shadow.offsetY": 1, "shadow.stroke": true });
		deadCount.add(deadCountText);

		// aliveCount
		const aliveCount = this.add.container(1130, 139);

		// aliveCountBg
		const aliveCountBg = this.add.rectangle(0, 0, 100, 40);
		aliveCountBg.isFilled = true;
		aliveCountBg.fillColor = 7434609;
		aliveCountBg.isStroked = true;
		aliveCountBg.strokeColor = 0;
		aliveCount.add(aliveCountBg);

		// aliveCountText
		const aliveCountText = this.add.text(0, 0, "", {});
		aliveCountText.setOrigin(0.5, 0.5);
		aliveCountText.text = "Alive:\n0";
		aliveCountText.setStyle({ "align": "center", "stroke": "#000000ff", "strokeThickness": 1, "shadow.offsetX": -2, "shadow.offsetY": 1, "shadow.stroke": true });
		aliveCount.add(aliveCountText);

		// levelManager
		new LevelManager(this);

		// randBtn (prefab fields)
		randBtn.btnType = "random";

		// pauseBtn (prefab fields)
		pauseBtn.btnType = "pause";

		this.clearBtn = clearBtn;
		this.randBtn = randBtn;
		this.pauseBtn = pauseBtn;
		this.playBtn = playBtn;
		this.deadCountText = deadCountText;
		this.aliveCountText = aliveCountText;

		this.events.emit("scene-awake");
	}

	private clearBtn!: Button;
	private randBtn!: Button;
	private pauseBtn!: Button;
	private playBtn!: Button;
	private deadCountText!: Phaser.GameObjects.Text;
	private aliveCountText!: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here

	get texts() { 
		return ({
			livingText: this.aliveCountText,
			deadText: this.deadCountText,
		}); 
	}
	get buttons() {
		return ({
			playBtn: this.playBtn,
			pauseBtn: this.pauseBtn,
			randBtn: this.randBtn,
			clearBtn: this.clearBtn,
		});
	}

	create() {

		this.editorCreate();

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
