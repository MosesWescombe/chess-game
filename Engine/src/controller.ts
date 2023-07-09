import { MoveRequestDto, BoardState, MoveResponseDto } from "shared-types";
import { EngineService } from "./Services/Engine";
import { Request, Response } from 'express';


export class EngineController {
    private engineService: EngineService;

    constructor() {
        this.engineService = new EngineService();
    }

    makeMove = (req: Request, res: Response): void => {
        try {
            const request = req.body as MoveRequestDto;
            console.log(request)

            this.engineService.isMoveLegal(request);

            res.status(200).send({ currentBoardState: BoardState.NORMAL, pieces: request.pieces } as MoveResponseDto)
        } catch (e) {
            console.log(e)
            res.status(500).send("Failed to make the move.")
        }
    }
}