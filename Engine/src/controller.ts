import { MoveRequestDto } from "shared-types";
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

            // Check that the move is legal
            if (!this.engineService.isMoveLegal(request)) {
                res.status(400).send("Illegal move")
                return;
            }

            // Make the move and recalculate possible moves.
            const response = this.engineService.makeMove(request)

            res.status(200).send(response)
        } catch (e) {
            console.log(e)
            res.status(500).send("Failed to make the move.")
        }
    }
}