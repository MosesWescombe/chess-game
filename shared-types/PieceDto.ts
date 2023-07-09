import { Color } from "./Color";
import { Coordinate } from "./Coordinate";
import { PieceType } from "./PieceType"

export type PieceDto = {
    type: PieceType,
    color: Color,
    coordinate: Coordinate,
    legalPositions: Coordinate[]
}