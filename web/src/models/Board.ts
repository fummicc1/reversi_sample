import type { Disk } from "./Disk"

export interface Board {
    width: number
    height: number
    disks: Disk[][] // disks[0][1]は0行1列の駒
}

export interface BoardResult {
    darkCount: number
    lightCount: number
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
        ]
    };
};

export const evaluateBoard = (board: Board): BoardResult => {
    let darkCount = 0;
    let lightCount = 0;
    for (const [x, row] of board.disks.entries()) {
        for (const [y, disk] of row.entries()) {
            if (disk === "dark") {
                darkCount += 1
            } else if (disk == "light") {
                lightCount += 1
            } else {
                continue;
            }
        }
    }
    return {
        darkCount: darkCount,
        lightCount: lightCount
    };
}