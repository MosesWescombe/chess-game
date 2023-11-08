import {
    Bishop,
    King,
    Knight,
    Pawn,
    Piece,
    PieceDto,
    PieceType,
    Queen,
    Rook,
    fileToColumn
} from './types/common_types';

function generateEmptyBoard(): (Piece | undefined)[][] {
    const board = [];

    for (let i = 0; i < 8; i++) {
        board.push([
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        ]);
    }

    return board;
}

function convertFromPieceDto(dto: PieceDto) {
    if (dto.piece_type === PieceType.KING)
        return new King(dto.color, dto.coordinate, false, dto.legal_moves);
    if (dto.piece_type === PieceType.QUEEN)
        return new Queen(dto.color, dto.coordinate, false, dto.legal_moves);
    if (dto.piece_type === PieceType.ROOK)
        return new Rook(dto.color, dto.coordinate, false, dto.legal_moves);
    if (dto.piece_type === PieceType.KNIGHT)
        return new Knight(dto.color, dto.coordinate, false, dto.legal_moves);
    if (dto.piece_type === PieceType.BISHOP)
        return new Bishop(dto.color, dto.coordinate, false, dto.legal_moves);
    if (dto.piece_type === PieceType.PAWN)
        return new Pawn(dto.color, dto.coordinate, false, dto.legal_moves);
}

export function convertPiecesToBoard(pieces: PieceDto[]): (Piece | undefined)[][] {
    let board = generateEmptyBoard();

    console.log(board);
    for (const piece of pieces) {
        console.log(8 - piece.coordinate.rank, fileToColumn(piece.coordinate.file) - 1);
        board[8 - piece.coordinate.rank][fileToColumn(piece.coordinate.file) - 1] =
            convertFromPieceDto(piece);
    }

    console.log(board);

    return board;
}
