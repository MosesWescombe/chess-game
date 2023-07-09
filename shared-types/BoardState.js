"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardState = void 0;
var BoardState;
(function (BoardState) {
    BoardState[BoardState["NORMAL"] = 0] = "NORMAL";
    BoardState[BoardState["CHECK"] = 1] = "CHECK";
    BoardState[BoardState["MATE"] = 2] = "MATE";
    BoardState[BoardState["DRAW"] = 3] = "DRAW";
})(BoardState || (exports.BoardState = BoardState = {}));
