import { MoveRequestDto } from "../types/MoveRequestDto";

export class EngineService {
    isMoveLegal(moveRequest: MoveRequestDto) {

        // Get piece being moved
        const movedPieceMatches = moveRequest.pieces.filter(piece => piece.coordinate[0] === moveRequest.move.from[0] && piece.coordinate[1] === moveRequest.move.from[1])
        if (movedPieceMatches.length < 1) throw new Error('Could not find piece to move');
        const movedPiece = movedPieceMatches[0]

        // Check that the move is pseudo legal
        // console.log(movedPiece.legalPositions, moveRequest.move.to, movedPiece.legalPositions.includes(moveRequest.move.to))
        return movedPiece.legalPositions.filter(position => position[0] === moveRequest.move.to[0] && position[1] === moveRequest.move.to[1])

        // Check that not taking own piece

        // Check that a piece is not in the way

        // Check that the move does not put self in check
    }
}