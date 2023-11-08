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

pub struct BitBoards {
    // White pieces
    pub white_pawns: u64,
    pub white_knights: u64,
    pub white_bishops: u64,
    pub white_rooks: u64,
    pub white_queens: u64,
    pub white_king: u64,
    
    // Black pieces
    pub black_pawns: u64,
    pub black_knights: u64,
    pub black_bishops: u64,
    pub black_rooks: u64,
    pub black_queens: u64,
    pub black_king: u64,

    // Combined pieces
    pub all_pieces: u64,
    pub white_pieces: u64,
    pub black_pieces: u64,
}

impl BitBoards {
    pub fn new() -> Self {
        let white_pawns: u64 = 0b11111111 << 8;
        let white_knights: u64 = 0b01000010;
        let white_bishops: u64 = 0b00100100;
        let white_rooks: u64 = 0b10000001;
        let white_queens: u64 = 0b00001000;
        let white_king: u64 = 0b00010000;

        let black_pawns: u64 = white_pawns.clone() << 8 * 5; // Same as white pawns but shifted up 5 rows
        let black_knights: u64 = white_knights.clone() << 8 * 7; // Same as white knights but shifted up 7 rows
        let black_bishops: u64 = white_bishops.clone() << 8 * 7;
        let black_rooks: u64 = white_rooks.clone() << 8 * 7;
        let black_queens: u64 = white_king.clone() << 8 * 7;
        let black_king: u64 = white_queens.clone() << 8 * 7;

        // Starting from bottom left corner of board
        BitBoards {
            white_pawns,
            white_knights,
            white_bishops,
            white_rooks,
            white_queens,
            white_king,

            black_pawns,
            black_knights,
            black_bishops,
            black_rooks,
            black_queens,
            black_king,
            
            all_pieces: white_pawns | white_knights | white_bishops | white_rooks | white_queens | white_king | black_pawns | black_knights | black_bishops | black_rooks | black_queens | black_king,
            white_pieces: white_pawns | white_knights | white_bishops | white_rooks | white_queens | white_king,
            black_pieces: black_pawns | black_knights | black_bishops | black_rooks | black_queens | black_king,
        }
    }
}
