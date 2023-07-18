import { Piece } from "./types/common_types";

function generateEmptyBoard(): (Piece | undefined)[][] {
    const board = [];

    for (let i = 0; i < 8; i++) {
        board.push([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined])
    }

    return board;
}

// function convertFromPieceDto(dto: PieceDto) {
//     let piece: Piece | undefined

//     if (dto.type === PieceType.KING) piece = new King(dto.coordinate[0], dto.coordinate[1], dto.color, dto.hasMoved, dto.legalPositions)
//     if (dto.type === PieceType.QUEEN) piece = new Queen(dto.coordinate[0], dto.coordinate[1], dto.color, dto.hasMoved, dto.legalPositions)
//     if (dto.type === PieceType.ROOK) piece = new Rook(dto.coordinate[0], dto.coordinate[1], dto.color, dto.hasMoved, dto.legalPositions)
//     if (dto.type === PieceType.KNIGHT) piece = new Knight(dto.coordinate[0], dto.coordinate[1], dto.color, dto.hasMoved, dto.legalPositions)
//     if (dto.type === PieceType.BISHOP) piece = new Bishop(dto.coordinate[0], dto.coordinate[1], dto.color, dto.hasMoved, dto.legalPositions)
//     if (dto.type === PieceType.PAWN) piece = new Pawn(dto.coordinate[0], dto.coordinate[1], dto.color, dto.hasMoved, dto.legalPositions)

//     return piece;
// }

// export function convertPiecesToBoard(pieces: PieceDto[]): (Piece | undefined)[][] {
//     const board = generateEmptyBoard();

//     for (const piece of pieces) {
//         board[piece.coordinate[0]][piece.coordinate[1]] = convertFromPieceDto(piece);
//     }

//     return board;
// }