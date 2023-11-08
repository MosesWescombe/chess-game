use serde::{ Deserialize, Serialize };

#[derive(Deserialize, Serialize, PartialEq)]
pub enum PieceType {
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING,
    EMPTY
}

#[derive(Deserialize, Serialize)]
pub enum Color {
    WHITE,
    BLACK,
}

#[derive(Deserialize, Serialize)]
pub struct Coordinate {
    pub file: char,
    pub rank: u8,
}

#[derive(Deserialize, Serialize)]
pub struct PieceDto {
    pub color: Color,
    pub piece_type: PieceType,
    pub coordinate: Coordinate,
    pub legal_moves: Vec<Coordinate>,
}

impl PieceDto {
    pub fn new(color: Color, piece_type: PieceType, coordinate: Coordinate, legal_moves: Vec<Coordinate>) -> Self {
        PieceDto {
            color,
            piece_type,
            coordinate,
            legal_moves,
        }
    }
}

#[derive(Deserialize)]
pub struct MoveRequest {
    pub pgn_string: String,
}

#[derive(Deserialize, Serialize)]
pub struct MoveResponseDto {
    pub moves: String,
    pub pieces: Vec<PieceDto>,
}

impl MoveResponseDto {
    pub fn new(moves: String, pieces: Vec<PieceDto>) -> Self {
        MoveResponseDto {
            moves,
            pieces,
        }
    }
}

#[derive(Clone, Copy)]
pub enum BitBoardIndex {
    WhitePawns = 0,
    WhiteKnights,
    WhiteBishops,
    WhiteRooks,
    WhiteQueens,
    WhiteKing,
    BlackPawns,
    BlackKnights,
    BlackBishops,
    BlackRooks,
    BlackQueens,
    BlackKing,
}

pub const ALL_WHITE_BOARDS: [BitBoardIndex; 6] = [
    BitBoardIndex::WhitePawns,
    BitBoardIndex::WhiteKnights,
    BitBoardIndex::WhiteBishops,
    BitBoardIndex::WhiteRooks,
    BitBoardIndex::WhiteQueens,
    BitBoardIndex::WhiteKing,
];

pub const ALL_BLACK_BOARDS: [BitBoardIndex; 6] = [
    BitBoardIndex::BlackPawns,
    BitBoardIndex::BlackKnights,
    BitBoardIndex::BlackBishops,
    BitBoardIndex::BlackRooks,
    BitBoardIndex::BlackQueens,
    BitBoardIndex::BlackKing,
];

pub const ALL_PIECE_BOARDS: [BitBoardIndex; 12] = [
    BitBoardIndex::WhitePawns,
    BitBoardIndex::WhiteKnights,
    BitBoardIndex::WhiteBishops,
    BitBoardIndex::WhiteRooks,
    BitBoardIndex::WhiteQueens,
    BitBoardIndex::WhiteKing,
    BitBoardIndex::BlackPawns,
    BitBoardIndex::BlackKnights,
    BitBoardIndex::BlackBishops,
    BitBoardIndex::BlackRooks,
    BitBoardIndex::BlackQueens,
    BitBoardIndex::BlackKing,
];

impl BitBoardIndex {
    pub fn to_label(&self) -> char {
        match self {
            BitBoardIndex::WhitePawns => 'P',
            BitBoardIndex::WhiteKnights => 'N',
            BitBoardIndex::WhiteBishops => 'B',
            BitBoardIndex::WhiteRooks => 'R',
            BitBoardIndex::WhiteQueens => 'Q',
            BitBoardIndex::WhiteKing => 'K',
            BitBoardIndex::BlackPawns => 'P',
            BitBoardIndex::BlackKnights => 'N',
            BitBoardIndex::BlackBishops => 'B',
            BitBoardIndex::BlackRooks => 'R',
            BitBoardIndex::BlackQueens => 'Q',
            BitBoardIndex::BlackKing => 'K',
        }
    }
}

#[derive(Clone)]
pub struct BitBoards(pub Vec<u64>);

impl BitBoards {
    // Constructor
    pub fn new() -> Self {
        BitBoards(vec![
            0b11111111 << 8,
            0b01000010,
            0b00100100,
            0b10000001,
            0b00001000,
            0b00010000,
            0b11111111 << 8 * 6,
            0b01000010 << 8 * 7,
            0b00100100 << 8 * 7,
            0b10000001 << 8 * 7,
            0b00010000 << 8 * 7,
            0b00001000 << 8 * 7,
            0b11111111 | 0b11111111 << 8 | 0b11111111 << 8 * 7 | 0b11111111 << 8 * 6,
            0b11111111 | 0b11111111 << 8,
            0b11111111 << 8 * 7 | 0b11111111 << 8 * 6,
        ])
    }

    pub fn get_pawns(&self) -> u64 {
        self.0[BitBoardIndex::WhitePawns as usize] | self.0[BitBoardIndex::BlackPawns as usize]
    }

    pub fn get_bishops(&self) -> u64 {
        self.0[BitBoardIndex::WhiteBishops as usize] | self.0[BitBoardIndex::BlackBishops as usize]
    }

    pub fn get_knights(&self) -> u64 {
        self.0[BitBoardIndex::WhiteKnights as usize] | self.0[BitBoardIndex::BlackKnights as usize]
    }

    pub fn get_rooks(&self) -> u64 {
        self.0[BitBoardIndex::WhiteRooks as usize] | self.0[BitBoardIndex::BlackRooks as usize]
    }

    pub fn get_queens(&self) -> u64 {
        self.0[BitBoardIndex::WhiteQueens as usize] | self.0[BitBoardIndex::BlackQueens as usize]
    }

    pub fn get_kings(&self) -> u64 {
        self.0[BitBoardIndex::WhiteKing as usize] | self.0[BitBoardIndex::BlackKing as usize]
    }

    pub fn get_white_pieces(&self) -> u64 {
        let mut all_white_pieces: u64 = 0;
        for index in ALL_WHITE_BOARDS {
            all_white_pieces |= self.0[index as usize];
        }

        all_white_pieces
    }

    pub fn get_black_pieces(&self) -> u64 {
        let mut all_black_pieces: u64 = 0;
        for index in ALL_BLACK_BOARDS {
            all_black_pieces |= self.0[index as usize];
        }

        all_black_pieces
    }

    pub fn get_all_pieces(&self) -> u64 {
        let mut all_pieces: u64 = 0;
        for index in ALL_PIECE_BOARDS {
            all_pieces |= self.0[index as usize];
        }

        all_pieces
    }

    // Getter method for a bitboard at a given index
    pub fn get_bitboard(&self, index: usize) -> u64 {
        self.0.get(index).cloned().unwrap()
    }

    // Setter method for a bitboard at a given index
    pub fn set_bitboard(&mut self, index: usize, value: u64) {
        self.0[index] = value;
    }
}