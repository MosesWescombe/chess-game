"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = exports.Rook = exports.Knight = exports.Bishop = exports.Queen = exports.King = exports.PieceDto = void 0;
var PieceDto = /** @class */ (function () {
    function PieceDto(color, coordinate, legalPositions) {
        this.color = color;
        this.coordinate = coordinate;
        this.legalPositions = legalPositions;
    }
    return PieceDto;
}());
exports.PieceDto = PieceDto;
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King(row, column, color, legalPositions) {
        if (legalPositions === void 0) { legalPositions = []; }
        return _super.call(this, color, [row, column], legalPositions) || this;
    }
    return King;
}(PieceDto));
exports.King = King;
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen(row, column, color, legalPositions) {
        if (legalPositions === void 0) { legalPositions = []; }
        return _super.call(this, color, [row, column], legalPositions) || this;
    }
    return Queen;
}(PieceDto));
exports.Queen = Queen;
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop(row, column, color, legalPositions) {
        if (legalPositions === void 0) { legalPositions = []; }
        return _super.call(this, color, [row, column], legalPositions) || this;
    }
    return Bishop;
}(PieceDto));
exports.Bishop = Bishop;
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight(row, column, color, legalPositions) {
        if (legalPositions === void 0) { legalPositions = []; }
        return _super.call(this, color, [row, column], legalPositions) || this;
    }
    return Knight;
}(PieceDto));
exports.Knight = Knight;
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook(row, column, color, legalPositions) {
        if (legalPositions === void 0) { legalPositions = []; }
        var _this = _super.call(this, color, [row, column], legalPositions) || this;
        _this.canCastle = true;
        return _this;
    }
    return Rook;
}(PieceDto));
exports.Rook = Rook;
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn(row, column, color, legalPositions) {
        if (legalPositions === void 0) { legalPositions = []; }
        var _this = _super.call(this, color, [row, column], legalPositions) || this;
        _this.hasMoved = false;
        return _this;
    }
    return Pawn;
}(PieceDto));
exports.Pawn = Pawn;
