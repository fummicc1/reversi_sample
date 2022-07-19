import type { Disk } from "./Disk"

export interface Board {
    width: number
    height: number
    disks: Disk[][] // disks[0][1]は0行1列の駒
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