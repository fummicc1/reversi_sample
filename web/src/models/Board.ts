import type { Disk } from "./Disk"

export interface Board {
    width: number
    height: number
    disks: Disk[][] // disks[0][1]は0行1列の駒
}

export const createNewBoard = (): Board => {
    return {
        width: 5,
        height: 5,
        disks: [
            ["light", null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
        ]
    };
};