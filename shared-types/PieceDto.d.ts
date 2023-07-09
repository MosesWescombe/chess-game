import { Color } from "./Color";
import { Coordinate } from "./Coordinate";
export declare class PieceDto {
    color: Color;
    coordinate: Coordinate;
    legalPositions: Coordinate[];
    constructor(color: Color, coordinate: Coordinate, legalPositions: Coordinate[]);
}
export declare class King extends PieceDto {
    constructor(row: number, column: number, color: Color, legalPositions?: Coordinate[]);
}
export declare class Queen extends PieceDto {
    constructor(row: number, column: number, color: Color, legalPositions?: Coordinate[]);
}
export declare class Bishop extends PieceDto {
    constructor(row: number, column: number, color: Color, legalPositions?: Coordinate[]);
}
export declare class Knight extends PieceDto {
    constructor(row: number, column: number, color: Color, legalPositions?: Coordinate[]);
}
export declare class Rook extends PieceDto {
    canCastle: boolean;
    constructor(row: number, column: number, color: Color, legalPositions?: Coordinate[]);
}
export declare class Pawn extends PieceDto {
    hasMoved: boolean;
    constructor(row: number, column: number, color: Color, legalPositions?: Coordinate[]);
}
