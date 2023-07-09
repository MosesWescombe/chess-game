import { BoardState, Coordinate, MoveRequestDto, MoveResponseDto, PieceDto, PieceType } from "shared-types";
import { convertFromPieceDto } from "../types/Pieces";

export class EngineService {
    private isCoordinateInList(coordinate: Coordinate, list: Coordinate[]) {
        return list.filter(c => c[0] === coordinate[0] && c[1] === coordinate[1]).length > 0
    }

    private getPieceAtCoordinate(coordinate: Coordinate, pieces: PieceDto[]): PieceDto | undefined {
        const piece = pieces.find(piece => piece.coordinate[0] === coordinate[0] && piece.coordinate[1] === coordinate[1])
        return piece
    }

    private getPieceIndexAtCoordinate(coordinate: Coordinate, pieces: PieceDto[]): number {
        const piece = pieces.findIndex(piece => piece.coordinate[0] === coordinate[0] && piece.coordinate[1] === coordinate[1])
        return piece
    }

    public calculateLegalPositions(pieces: PieceDto[]) {
        const updatedPieces: PieceDto[] = [];

        for (const piece of pieces) {
            const enginePiece = convertFromPieceDto(piece)

            if (!enginePiece) continue;

            if (piece.type === PieceType.KING)
                console.log(enginePiece?.getPseudoMoves())

            updatedPieces.push({ ...piece, legalPositions: enginePiece.getPseudoMoves() })
        }


        return updatedPieces;
    }

    public isMoveLegal(moveRequest: MoveRequestDto) {

        // Get piece being moved
        const movedPiece = this.getPieceAtCoordinate(moveRequest.move.from, moveRequest.pieces)

        if (!movedPiece) throw new Error('Could not find piece to move');

        // Check that the move is pseudo legal

        // Check that not taking own piece

        // Check that a piece is not in the way

        // Check that the move does not put self in check

        return this.isCoordinateInList(moveRequest.move.to, movedPiece.legalPositions);
    }

    public makeMove(moveRequest: MoveRequestDto): MoveResponseDto {
        const response = { currentBoardState: BoardState.NORMAL } as MoveResponseDto;
        response.pieces = moveRequest.pieces;

        // Get target piece
        const targetPieceIndex = this.getPieceIndexAtCoordinate(moveRequest.move.from, response.pieces)
        if (targetPieceIndex < 0) throw new Error("Could not find pieces at move locations")
        let targetPiece = response.pieces.splice(targetPieceIndex, 1)[0]

        // Move the target piece
        targetPiece.coordinate = moveRequest.move.to;

        // Remove the destination piece if exists
        const destinationPieceIndex = this.getPieceIndexAtCoordinate(moveRequest.move.to, response.pieces)
        if (destinationPieceIndex >= 0) {
            response.pieces.splice(destinationPieceIndex, 1)
        }

        // Add the updated peices
        response.pieces.push(targetPiece)

        response.pieces = this.calculateLegalPositions(response.pieces)

        // console.log(moveRequest.move.to, moveRequest.move.from)
        // console.log("Sending Pieces Pieces: ")
        // for (const piece of response.pieces) {
        //     console.log(`${piece.type.toString()} ---`, piece.coordinate)
        // }

        return response;
    }
}