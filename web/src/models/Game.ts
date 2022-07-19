import { createNewBoard, evaluateBoard, type Board, type BoardResult } from "./Board";
import type { Position } from "./Position";
import { cloneDeep } from 'lodash'

export interface Game {
    board: Board
    state: "win" | "draw" | "lose" | null
    currentTurn: "me" | "opponent"
    myColor: "dark" | "light"
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
    disk = game.myColor;
    game.board.disks[position.x][position.y] = disk;
    return game;
}

export const decideCpuAction = (game: Game): Game => {
    let emptyPosition: Position | null = null;
    let bestScore = 0;
    let ans: Position | null = null;
    if (game.myColor == "dark") {
        bestScore = evaluateBoard(game.board).darkCount
    } else if (game.myColor == "light") {
        bestScore = evaluateBoard(game.board).lightCount
    }
    for (const [x, row] of game.board.disks.entries()) {
        for (const [y, disk] of row.entries()) {
            if (disk === null) {
                emptyPosition = {
                    x: x,
                    y: y
                }
                let tempBoard = cloneDeep(game.board);
                tempBoard.disks[x][y] = game.myColor;
                const tempResult = evaluateBoard(tempBoard);
                let tempScore = 0;
                if (game.myColor == "dark") {
                    tempScore = tempResult.darkCount;
                } else if (game.myColor == "light") {
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
    let opponentColor: "light" | "dark" = "light";
    if (game.myColor == "light") {
        opponentColor = "dark";
    }
    game.board.disks[ans.x][ans.y] = opponentColor;
    return game;
}