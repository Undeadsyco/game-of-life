export type pos = { x: number, y: number };

export type cellType = ("0" | "1");

export type gridMap = Map<pos, cellType>

export type row = cellType[];

export type grid = row[];

export type stateType = ("play"|"pause");

export type buttonType = ("play"|"pause"|"random"|"clear");
