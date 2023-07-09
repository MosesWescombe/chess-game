import { Color } from "./Color";

export class PieceDto {
    constructor(
        public color: Color,
        public coordinate: [number, number],
        public legalPositions: [number, number][]
    ) { }

    getPseudoMoves(): [number, number][] {
        return [];
    }
}

export class King extends PieceDto {
    constructor(
        row: number,
        column: number,
        color: Color,
        legalPositions: [number, number][] = []
    ) {
        super(
            color,
            [row, column],
            legalPositions
        );
    }

    getPseudoMoves(): [number, number][] {
        const moves = [] as [number, number][];

        // Y-Axis
        moves.push([this.coordinate[0] + 1, this.coordinate[1] - 1])
        moves.push([this.coordinate[0] + 1, this.coordinate[1] - 1])


        // X-Axis
        moves.push([this.coordinate[0] + 1, this.coordinate[1] - 1])
        moves.push([this.coordinate[0] + 1, this.coordinate[1] - 1])


        // Diagonal
        moves.push([this.coordinate[0] + 1, this.coordinate[1] - 1])
        moves.push([this.coordinate[0] + 1, this.coordinate[1] - 1])
        moves.push([this.coordinate[0] + 1, this.coordinate[1] - 1])
        moves.push([this.coordinate[0] + 1, this.coordinate[1] - 1])


        return moves;
    }
}

export class Queen extends PieceDto {
    constructor(
        row: number,
        column: number,
        color: Color,
        legalPositions: [number, number][] = []
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
        legalPositions: [number, number][] = []
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
        legalPositions: [number, number][] = []
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
        legalPositions: [number, number][] = []
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
        legalPositions: [number, number][] = []
    ) {
        super(
            color,
            [row, column],

            legalPositions
        );
    }

    getPseudoMoves(): [number, number][] {
        const moves = [] as [number, number][];

        const directionMultiplyer = this.color == Color.WHITE ? -1 : 1;

        // Y-Axis
        moves.push([this.coordinate[0] + 1, this.coordinate[1] - 1])

        if (!this.hasMoved)
            moves.push([this.coordinate[0] + 1, this.coordinate[1] - 1])

        return moves;
    }
}
