export { Piece, Pawn, King, Queen, Rook, Knight, Bishop } from './Pieces';

export type Coordinate = {
    file: string;
    rank: number;
};

export type PieceDto = {
    color: Color;
    coordinate: Coordinate;
    piece_type: PieceType;
    legal_moves: Coordinate[];
};

export type MoveResponseDto = {
    moves: string;
    pieces: PieceDto[];
};

export type Move = {
    to: Coordinate;
    from: Coordinate;
};

export enum PieceType {
    PAWN = 'PAWN',
    BISHOP = 'BISHOP',
    KNIGHT = 'KNIGHT',
    ROOK = 'ROOK',
    QUEEN = 'QUEEN',
    KING = 'KING'
}

export enum Color {
    WHITE = 'WHITE',
    BLACK = 'BLACK'
}

export function doCoordinatesMatch(c1: Coordinate, c2: Coordinate): boolean {
    return c1.file == c2.file && c1.rank == c2.rank;
}

export function fileToColumn(file: string): number {
    return file.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}

export function columnToFile(col: number): string {
    return String.fromCharCode(col + 'a'.charCodeAt(0) - 1);
}
