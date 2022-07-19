import { createNewBoard, evaluateBoard, flipDisk, isSameBoard, type Board, type BoardResult } from "./Board";
import type { Position } from "./Position";
import { cloneDeep } from 'lodash'
import type { Disk } from "./Disk";

export type GameState = "win" | "draw" | "lose" | null;

export interface Game {
    board: Board
    state: GameState
    currentTurn: "me" | "opponent"
    myColor: Disk
    boardResult: BoardResult
}

export const createNewGame = (): Game => {
    return {
        board: createNewBoard(),
        state: null,
        currentTurn: "me",
        myColor: "dark",
        boardResult: {
            darkCount: 0,
            lightCount: 0
        }
    }
}

export const addMyColor = (game: Game, position: Position): Game => {
    let disk = game.board.disks[position.x][position.y];
    if (disk != null) {
        throw new Error('その位置には駒を置けません');
    }
    const temp = cloneDeep(game);
    disk = temp.myColor;
    temp.board.disks[position.x][position.y] = disk;
    const tempNewBoard = flipDisk(cloneDeep(temp.board), position, game.myColor);
    if (!isSameBoard(tempNewBoard, temp.board)) {
        game.board.disks = temp.board.disks;
    } else {
        throw new Error('その位置には駒を置けません');
    }
    return game;
}

export const decideCpuAction = (game: Game): Position | null => {
    let emptyPosition: Position | null = null;
    let bestScore = 0;
    let ans: Position | null = null;
    const opponentColor: Disk = game.myColor == "dark" ? "light" : "dark";
    bestScore = opponentColor == "dark" ? evaluateBoard(game.board).darkCount : evaluateBoard(game.board).lightCount;
    for (const [x, row] of game.board.disks.entries()) {
        for (const [y, disk] of row.entries()) {
            if (disk === null) {
                emptyPosition = {
                    x: x,
                    y: y
                }
                let tempBoard = cloneDeep(game.board);
                tempBoard.disks[x][y] = game.myColor;
                tempBoard = flipDisk(tempBoard, { x: x, y: y }, opponentColor);
                const tempResult = evaluateBoard(tempBoard);
                let tempScore = 0;
                if (opponentColor == "dark") {
                    tempScore = tempResult.darkCount;
                } else if (opponentColor == "light") {
                    tempScore = tempResult.lightCount;
                }
                if (tempScore >= bestScore) {
                    bestScore = tempScore
                    ans = {
                        x: x,
                        y: y
                    };
                }
            }
        }
    }
    if (ans == null) {
        ans = emptyPosition!;
    }
    console.log("cpu choice", ans);
    if (ans != null) {
        game.board.disks[ans.x][ans.y] = opponentColor;
    }
    return ans;
}

export const calcGameResult = (game: Game): GameState => {
    const result = evaluateBoard(game.board);
    if (result.darkCount === result.lightCount) {
        return "draw";
    }
    if (game.myColor === "dark") {
        if (result.darkCount > result.lightCount) {
            return "win";
        } else {
            return "lose"
        }
    } else {
        if (result.darkCount < result.lightCount) {
            return "win";
        } else {
            return "lose"
        }
    }
}