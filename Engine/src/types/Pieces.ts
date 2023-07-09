import { Color, Coordinate, PieceDto, PieceType } from "shared-types";

export function convertFromPieceDto(dto: PieceDto) {
    let piece: Piece | undefined

    if (dto.type === PieceType.KING) piece = new King(dto.coordinate[0], dto.coordinate[1], dto.color, dto.legalPositions)
    if (dto.type === PieceType.QUEEN) piece = new Queen(dto.coordinate[0], dto.coordinate[1], dto.color, dto.legalPositions)
    if (dto.type === PieceType.ROOK) piece = new Rook(dto.coordinate[0], dto.coordinate[1], dto.color, dto.legalPositions)
    if (dto.type === PieceType.KNIGHT) piece = new Knight(dto.coordinate[0], dto.coordinate[1], dto.color, dto.legalPositions)
    if (dto.type === PieceType.BISHOP) piece = new Bishop(dto.coordinate[0], dto.coordinate[1], dto.color, dto.legalPositions)
    if (dto.type === PieceType.PAWN) piece = new Pawn(dto.coordinate[0], dto.coordinate[1], dto.color, dto.legalPositions)

    return piece;
}

export class Piece {
    constructor(
        public color: Color,
        public coordinate: Coordinate,
        public legalPositions: Coordinate[]
    ) { }

    getPseudoMoves(): Coordinate[] {
        return [];
    }
}

export class King extends Piece {
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

    getPseudoMoves(): Coordinate[] {
        const moves = [] as Coordinate[];

        // Y-Axis
        moves.push([this.coordinate[0] + 1, this.coordinate[1]])
        moves.push([this.coordinate[0] - 1, this.coordinate[1]])

        // X-Axis
        moves.push([this.coordinate[0], this.coordinate[1] + 1])
        moves.push([this.coordinate[0], this.coordinate[1] - 1])

        // Diagonal
        moves.push([this.coordinate[0] + 1, this.coordinate[1] - 1])
        moves.push([this.coordinate[0] - 1, this.coordinate[1] + 1])
        moves.push([this.coordinate[0] + 1, this.coordinate[1] + 1])
        moves.push([this.coordinate[0] - 1, this.coordinate[1] - 1])


        return moves;
    }
}

export class Queen extends Piece {
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

export class Bishop extends Piece {
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

export class Knight extends Piece {
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

export class Rook extends Piece {
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

export class Pawn extends Piece {
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

    getPseudoMoves(): Coordinate[] {
        const moves = [] as Coordinate[];

        const directionMultiplyer = this.color == Color.WHITE ? -1 : 1;

        // Y-Axis
        moves.push([this.coordinate[0] + (1 * directionMultiplyer), this.coordinate[1]])

        if (!this.hasMoved)
            moves.push([this.coordinate[0] + (2 * directionMultiplyer), this.coordinate[1]])

        return moves;
    }
}
