
// You can write more code here

export const gridManagerEvents = {
	changeCell: "change-cell",
	randomizeGrid: "randomize-grid",
	clearGrid: "clear-grid",
	stepGrid: "step-grid",
} as const;

/* START OF COMPILED CODE */

import ScriptNode from "../../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import LevelManager, { levelManagerEvents } from "./LevelManager";
import { EventCenter } from "../../utils";
import { entityManagerEvents } from "./EntityManager";
import { cellManagerEvents } from "../object-managers/CellManager";
import { cellType, grid } from "../../../types";
/* END-USER-IMPORTS */

export default class GridManger extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.

		this.initEvents();

		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	override get parent() {
		return super.parent as LevelManager;
	}
	private grid: grid = [];

	private createGrid(): void {
		const grid: grid = [];
		let count: number = 0;

		for (let y = 0; y < this.parent.columnCount; y++) {
			const row: cellType[] = [];
		
			for (let x = 0; x < this.parent.rowCount; x++) {
				count += 1;
				row[x] = "0";
				EventCenter.emitter.emit(`${this.scene.scene.key}-${entityManagerEvents.addCell}`, { x, y, value: row[x] })
			}
		
			grid[y] = row;
		}
		
		this.gridComplete({ grid, living: 0, dead: count });
	}

	private randomizeGrid() {
		const randomize = (x: number, y: number) => (`${Phaser.Math.Between(0, 1)}` as cellType)
		this.gridComplete(this.loopGrid(randomize));
	}

	private cleargrid() {
		const clear = (x: number, y: number) => ("0" as cellType)
		
		this.gridComplete(this.loopGrid(clear));
	}

	private stepGrid() {
		const step = (x: number, y: number) => {
			const count = this.checkNeighbors({ x, y });
			let newValue: cellType | undefined = undefined;

			if (this.grid[y][x] === "0" && count === 3) newValue = "1";

			if (this.grid[y][x] === "1" && (count >= 4 || count <= 1)) newValue = "0";

			if (newValue) return newValue;
			else return this.grid[y][x];
		}
		
		this.gridComplete(this.loopGrid(step));
	}

	private gridComplete({ grid, living, dead }: { grid: grid, living: number, dead: number }) {
		this.grid = grid;
		EventCenter.emitter.emit(`${this.scene.scene.key}-${levelManagerEvents.updateText}`, { living, dead });
	}

	private loopGrid(callback: (x: number, y: number) => cellType): { grid: grid, living: number, dead: number } {
		let living = 0;
		let dead = 0;

		const grid: grid = [];

		for (let y = 0; y < this.grid.length; y++) {
			const row: cellType[] = [];

			for (let x = 0; x < this.grid[y].length; x++) {
				const value = callback(x, y);

				if (value === "0") dead += 1;
				else living += 1;

				if (this.grid[y][x] !== value) EventCenter.emitter.emit(`${x}-${y}-${cellManagerEvents.changeState}`, (value));
				row[x] = value;
			}

			grid[y] = row;
		}

		return { grid, living, dead };
	}

	private checkNeighbors(pos: { x: number, y: number }): number {
		const living: ("1")[] = [];
		for (let y = pos.y - 1; y <= pos.y + 1; y++) {
			for (let x = pos.x - 1; x <= pos.x + 1; x++) {
				if (pos.y === 0 || pos.x === 0) {
					if (y < 0 || x < 0) continue;
				}

				if (y === pos.y && x === pos.x) continue;
				if (y >= this.grid.length || x >= this.grid[y].length) continue;

				if (this.grid[y][x] === "1") living.push(this.grid[y][x] as ("1"));
			}
		}

		return living.length;
	}

	private changeCell({ x, y, value }: { x: number, y: number, value: cellType }) {
		this.grid[y][x] = value;
	}

	private initEvents() {
		EventCenter.emitter.on(`${this.scene.scene.key}-${gridManagerEvents.changeCell}`, this.changeCell, this);
		EventCenter.emitter.on(`${this.scene.scene.key}-${gridManagerEvents.stepGrid}`, this.stepGrid, this);
		EventCenter.emitter.on(`${this.scene.scene.key}-${gridManagerEvents.randomizeGrid}`, this.randomizeGrid, this);
		EventCenter.emitter.on(`${this.scene.scene.key}-${gridManagerEvents.clearGrid}`, this.cleargrid, this);
	}

	protected override awake(): void {
		this.createGrid();
	}

	protected override destroy(): void {
		EventCenter.emitter.off(`${this.scene.scene.key}-${gridManagerEvents.changeCell}`, this.changeCell, this);
		EventCenter.emitter.off(`${this.scene.scene.key}-${gridManagerEvents.stepGrid}`, this.stepGrid, this);
		EventCenter.emitter.off(`${this.scene.scene.key}-${gridManagerEvents.randomizeGrid}`, this.randomizeGrid, this);
		EventCenter.emitter.off(`${this.scene.scene.key}-${gridManagerEvents.clearGrid}`, this.cleargrid, this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
