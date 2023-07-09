export type Coordinate = [number, number]

export function doCoordinatesMatch(c1: Coordinate, c2: Coordinate) {
    return c1[0] === c2[0] && c1[1] === c2[1];
}