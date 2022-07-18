import type { Board } from "./Board";

export interface Game {
    board: Board
    state: "win" | "draw" | "lose" | null
}