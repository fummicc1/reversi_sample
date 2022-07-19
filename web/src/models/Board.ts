import { cloneDeep, tail, zip } from "lodash";
import type { Disk } from "./Disk";
import type { Position } from "./Position";

export interface Board {
  width: number;
  height: number;
  disks: (Disk | null)[][]; // disks[0][1]は0行1列の駒
}

export interface BoardResult {
  darkCount: number;
  lightCount: number;
}

export const createNewBoard = (): Board => {
  return {
    width: 6,
    height: 6,
    disks: [
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, "light", "dark", null, null],
      [null, null, "dark", "light", null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ],
  };
};

export const isSameBoard = (board: Board, other: Board): boolean => {
  for (const [row, row2] of zip(board.disks, other.disks)) {
    for (const [disk, disk2] of zip(row, row2)) {
      if (disk != disk2) {
        return false;
      }
    }
  }
  return true;
};

export const flipDisk = (
  board: Board,
  position: Position,
  myColor: Disk
): Board => {
  const xNeighbors = [-1, 0, 1];
  const yNeighbors = [-1, 0, 1];
  const opponentColor: Disk = myColor == "light" ? "dark" : "light";
  for (const xDiff of xNeighbors) {
    for (const yDiff of yNeighbors) {
      const tempBoard = cloneDeep(board);
      const can = flipDiskRecursive(
        tempBoard,
        position,
        xDiff,
        yDiff,
        myColor,
        opponentColor
      );
      for (const pos of can) {
        board.disks[pos.x][pos.y] = myColor;
      }
    }
  }
  return board;
};

const flipDiskRecursive = (
  board: Board,
  position: Position,
  xDiff: number,
  yDiff: number,
  target: Disk,
  interchangeable: Disk
): Position[] => {
  const tailPosition: Position | null = {
    x: position.x + xDiff,
    y: position.y + yDiff,
  };
  if (
    board.width <= tailPosition.x ||
    tailPosition.x < 0 ||
    board.height <= tailPosition.y ||
    tailPosition.y < 0
  ) {
    return [];
  }
  if (tailPosition.x == position.x && tailPosition.y == position.y) {
    return [];
  }
  if (board.disks[tailPosition.x][tailPosition.y] == interchangeable) {
    if (
      board.width <= tailPosition.x + xDiff || tailPosition.x + xDiff < 0 ||
      board.height <= tailPosition.y + yDiff || tailPosition.y + yDiff < 0
    ) {
      return [];
    }
    const nextDisk =
      board.disks[tailPosition.x + xDiff][tailPosition.y + yDiff];
    if (nextDisk == target) {
      board.disks[tailPosition.x][tailPosition.y] = target;
      return [tailPosition];
    } else if (nextDisk == null) {
      return [];
    }
    board.disks[tailPosition.x][tailPosition.y] = target;
    let ans: Position[] = [];
    const rec = flipDiskRecursive(
      board,
      tailPosition,
      xDiff,
      yDiff,
      target,
      interchangeable
    );
    if (rec.length) {
      ans = rec.concat([tailPosition]);
    }
    return ans;
  }
  return [];
};

export const evaluateBoard = (board: Board): BoardResult => {
  let darkCount = 0;
  let lightCount = 0;
  for (const [x, row] of board.disks.entries()) {
    for (const [y, disk] of row.entries()) {
      if (disk === "dark") {
        darkCount += 1;
      } else if (disk == "light") {
        lightCount += 1;
      } else {
        continue;
      }
    }
  }
  return {
    darkCount: darkCount,
    lightCount: lightCount,
  };
};
