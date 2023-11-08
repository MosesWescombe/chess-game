pub mod printing;
pub mod types;
pub mod moves;

use warp::{ Filter, body::json, path, filters::cors::Builder };
use types::{MoveResponseDto, BitBoards, MoveRequest, PieceType, Coordinate, Color};
use printing::{print_ascii_board, print_u64_board};

use crate::moves::{move_piece, get_square_moves, recompile_boards};

/// MAIN
#[tokio::main]
async fn main() {
    // POST /move => 200 OK with body MoveResponse
    let move_route = warp
        ::post()
        .and(path("move"))
        .and(path::end())
        .and(json())
        .and_then(find_next_move);

    let routes = move_route;

    let cors: Builder = warp
        ::cors() // Create a CORS policy
        .allow_any_origin()
        .allow_methods(vec!["GET", "POST"]) // Allow only GET and POST methods
        .allow_headers(vec!["Content-Type"]);

    let routes = routes.with(cors);

    // Run server
    warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
}

fn extract_moves(pgn: &str) -> Vec<String> {
    let mut moves: Vec<String> = vec![];

    let mut start_index: usize = 0;
    for (index, character) in pgn.chars().enumerate() {
        if character == '.' {
            if start_index > 0 {
                moves.push(pgn[start_index + 2..index].to_string());
            }

            start_index = index;
        }
    }

    if start_index > 0 {
        // Add the last move
        moves.push(pgn[start_index + 2..].to_string());
    }

    moves
}

fn convert_pgn_to_bitboard(pgn_string: &String) -> BitBoards{
    // Create the initial piece bitboards
    let mut boards: BitBoards = BitBoards::new();

    // Base board
    println!("Initial board: ");
    print_ascii_board(&boards);

    // let legal_moves: [u64; 64] = get_square_moves(&board);
    // let combined = combine_boards(&legal_moves);

    // println!("Legal moves: ");
    // print_u64_board(combined)

    // Go through the moves
    let moves = extract_moves(pgn_string);
    for (index, move_string) in moves.iter().enumerate() {
        let components: Vec<&str> = move_string.split_whitespace().collect::<Vec<&str>>();
        println!("Move {}: '{}', '{}'", index, components[0], components[1]);

        boards = move_piece(boards, components[0], components[1])
    }

    // Recalculate collective boards
    boards = recompile_boards(boards);

    println!("Moved white board: ");
    print_u64_board(boards.white_pieces);

    println!("Moved black board: ");
    print_u64_board(boards.black_pieces);

    println!("Moved board: ");
    print_ascii_board(&boards);

    boards
}

fn get_bitboard_positive_coordinates(bitboard: u64) -> Vec<Coordinate> {
    // Convert legal moves to coordinates
    let mut legal_move_coordinates: Vec<Coordinate> = vec![];

    for position in 0..64 {
        // Create a mask for the single bit at the current position
        let mask: u64 = 1u64 << position;
        // Check if the bit is set in the bitboard
        if bitboard & mask != 0 {
            // Calculate rank (1 to 8) and file (a to h)
            let rank: u8 = position / 8 + 1 as u8; // Add 1 because chess ranks are 1-indexed
            let file: u8 = (position % 8) as u8; // Convert to 0-indexed file number
            // Convert 0-indexed file number to a letter from 'a' to 'h'
            let file_letter: char = (file + b'a') as char;

            legal_move_coordinates.push(Coordinate { file: file_letter, rank });
        }
    }

    legal_move_coordinates
}

fn convert_board_to_dto(boards: BitBoards, legal_moves: [u64; 64]) -> Vec<types::PieceDto> {
    let mut pieces: Vec<types::PieceDto> = vec![];

    // Iterate over the squares and find the moves for each piece
    for rank in 0..8 {
        for file in 0..8 {
            let square_mask: u64 = 0b1 << (rank * 8 + file);

            if boards.all_pieces & square_mask == 0 {
                continue;
            }
            
            // Color
            let color: Color = if boards.white_pieces & square_mask > 0 {
                Color::WHITE
            } else {
                Color::BLACK
            };

            // Piece type
            let piece_type: PieceType;
            if (boards.white_bishops | boards.black_bishops) & square_mask > 0 {
                piece_type = PieceType::BISHOP;
            } else if (boards.white_king | boards.black_king) & square_mask > 0 {
                piece_type = PieceType::KING;
            } else if (boards.white_knights | boards.black_knights) & square_mask > 0 {
                piece_type = PieceType::KNIGHT;
            } else if (boards.white_pawns | boards.black_pawns) & square_mask > 0 {
                piece_type = PieceType::PAWN;
            } else if (boards.white_queens | boards.black_queens) & square_mask > 0 {
                piece_type = PieceType::QUEEN;
            } else if (boards.white_rooks | boards.black_rooks) & square_mask > 0 {
                piece_type = PieceType::ROOK;
            } else {
                piece_type = PieceType::EMPTY;
            }

            // Push piece to vector
            if piece_type != PieceType::EMPTY {
                let legal_moves: Vec<Coordinate> = get_bitboard_positive_coordinates(legal_moves[rank * 8 + file]);
                pieces.push(types::PieceDto::new(color, piece_type, Coordinate { file: ((file as u8) + b'a') as char, rank: rank as u8 + 1 }, legal_moves));
            }
        }
    }

    pieces
}

///
/// Check that the latest move is legal. If it is calculate board state.
///
async fn find_next_move(move_request: MoveRequest) -> Result<impl warp::Reply, warp::Rejection> {
    println!("Calculating Moves");
    let moves_pgn: String = move_request.pgn_string;

    // Calculate bit boards using PGN notation.
    let boards: BitBoards = convert_pgn_to_bitboard(&moves_pgn);
    let legal_moves: [u64; 64] = get_square_moves(&boards);

    // Convert board to Piece DTOs
    let pieces_dto: Vec<types::PieceDto> = convert_board_to_dto(boards, legal_moves);

    let result: MoveResponseDto = MoveResponseDto::new(moves_pgn.clone(), pieces_dto);
    Ok(warp::reply::json(&result))

    // Else return error response
}