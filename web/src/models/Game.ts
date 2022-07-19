import { createNewBoard, type Board } from "./Board";

export interface Game {
    board: Board
    state: "win" | "draw" | "lose" | null
    currentTurn: "me" | "opponent"
}

export const createNewGame = (): Game => {
    return {
        board: createNewBoard(),
        state: null,
        currentTurn: "me"
    }
}