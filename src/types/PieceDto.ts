import { Color } from "./Color";
import { Coordinate } from "./Coordinate";

export class PieceDto {
    constructor(
        public color: Color,
        public coordinate: Coordinate,
        public legalPositions: Coordinate[]
    ) { }
}

export class King extends PieceDto {
    constructor(
        row: number,
        column: number,
        color: Color,
        legalPositions: Coordinate[] = []
    ) {
        super(
            color,
            [row, column],
            legalPositions
        );
    }
}

export class Queen extends PieceDto {
    constructor(
        row: number,
        column: number,
        color: Color,
        legalPositions: Coordinate[] = []
    ) {
        super(
            color,
            [row, column],
            legalPositions
        );
    }
}

export class Bishop extends PieceDto {
    constructor(
        row: number,
        column: number,
        color: Color,
        legalPositions: Coordinate[] = []
    ) {
        super(
            color,
            [row, column],
            legalPositions
        );
    }
}

export class Knight extends PieceDto {
    constructor(
        row: number,
        column: number,
        color: Color,
        legalPositions: Coordinate[] = []
    ) {
        super(
            color,
            [row, column],
            legalPositions
        );
    }
}

export class Rook extends PieceDto {
    public canCastle = true;

    constructor(
        row: number,
        column: number,
        color: Color,
        legalPositions: Coordinate[] = []
    ) {
        super(
            color,
            [row, column],
            legalPositions
        );
    }
}

export class Pawn extends PieceDto {
    public hasMoved = false;

    constructor(
        row: number,
        column: number,
        color: Color,
        legalPositions: Coordinate[] = []
    ) {
        super(
            color,
            [row, column],
            legalPositions
        );
    }
}
