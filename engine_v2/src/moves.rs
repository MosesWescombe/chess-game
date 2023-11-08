use crate::types::{BitBoards, ALL_PIECE_BOARDS};

pub fn find_pawn_moves(bit_boards: &BitBoards, position_mask: u64, is_white: bool) -> u64 {
    let mut moves: u64 = 0;
    let all_pieces: u64 = bit_boards.get_all_pieces();
    let white_pieces: u64 = bit_boards.get_white_pieces();
    let black_pieces: u64 = bit_boards.get_black_pieces();

    if is_white {
        // Move directly above (current_position up one row excluding space with black piece)
        moves |= (position_mask << 8) & (!all_pieces);

        // Move two squares up if on initial square and no piece in front
        if position_mask & 0b1111111100000000 == position_mask  // On initial square
            && (position_mask << 8) & (!all_pieces) > 0 // No piece in front
        {
            moves |= (position_mask << 16) & (!all_pieces);
        }
    }
    if !is_white {
        moves |= (position_mask >> 8) & (!all_pieces);

        if position_mask & (0b11111111 << 8*6) == position_mask && (position_mask >> 8) & (!all_pieces) > 0 {
            moves |= (position_mask >> 16) & (!all_pieces);
        }
    }

    // Find all pawn captures
    let attack_mask: u64 = position_mask << 1 | position_mask >> 1;
    if is_white {
        moves |= attack_mask << 8 & black_pieces;
    }
    if !is_white {
        moves |= attack_mask >> 8 & white_pieces;
    }

    // Find all pawn en passant

    // Mask edges
    let trailing_zeros: u8 = position_mask.trailing_zeros() as u8; // Single CPU instruction
    let file: u8 = trailing_zeros % 8;

    if file < 1 {
        moves &= !0b1000000010000000100000001000000010000000100000001000000010000000; // Exclude h file
    } else if file > 6 {
        moves &= !0b0000000100000001000000010000000100000001000000010000000100000001; // Exclude a file
    }

    moves
}

pub fn find_knight_moves(bit_boards: &BitBoards, position_mask: u64, is_white: bool) -> u64 {
    let mut moves: u64 = 0;

    // Find all knight moves
    let horizontal_mask: u64 = position_mask << 1 | position_mask >> 1;
    let vertical_mask: u64 = position_mask << 8 | position_mask >> 8;

    moves |= horizontal_mask << 16 | horizontal_mask >> 16 | vertical_mask << 2 | vertical_mask >> 2;

    let trailing_zeros: u8 = position_mask.trailing_zeros() as u8; // Single CPU instruction
    let file: u8 = trailing_zeros % 8;

    // Mask edges
    if file < 2 {
        moves &= !0b1100000011000000110000001100000011000000110000001100000011000000; // Exclude g and h files
    } else if file > 5 {
        moves &= !0b0000001100000011000000110000001100000011000000110000001100000011; // Exclude a and b files
    }
 
    // Remove an self takes
    if is_white {
        moves &= !bit_boards.get_white_pieces();
    } else {
        moves &= !bit_boards.get_black_pieces();
    }

    moves
}

pub fn find_king_moves(bit_boards: &BitBoards, position_mask: u64, is_white: bool) -> u64 {
    let mut moves: u64 = 0;

    // Find all knight moves
    let horizontal_mask: u64 = position_mask | position_mask << 1 | position_mask >> 1;
    moves |= horizontal_mask << 8 | horizontal_mask >> 8 | horizontal_mask;

    // Mask edges
    let trailing_zeros: u8 = position_mask.trailing_zeros() as u8; // Single CPU instruction
    let file: u8 = trailing_zeros % 8;

    if file < 1 {
        moves &= !0b1000000010000000100000001000000010000000100000001000000010000000; // Exclude h file
    } else if file > 6 {
        moves &= !0b0000000100000001000000010000000100000001000000010000000100000001; // Exclude a file
    }
 
    // Remove an self takes
    if is_white {
        moves &= !bit_boards.get_white_pieces();
    } else {
        moves &= !bit_boards.get_black_pieces();
    }

    moves
}

pub fn get_square_moves(bit_boards: &BitBoards) -> [u64; 64] {
    let mut moves: [u64; 64] = [0; 64];

    // Iterate over the squares and find the moves for each piece
    for rank in 0..8 {
        for file in 0..8 {
            let square_mask: u64 = 0b1 << (rank * 8 + file);
            let is_white: bool = bit_boards.get_white_pieces() & square_mask > 0;

            // Pawn
            if (bit_boards.get_pawns()) & square_mask > 0 {
                moves[rank * 8 + file] = find_pawn_moves(bit_boards, square_mask, is_white)
            }

            // Knight
            if (bit_boards.get_knights()) & square_mask > 0 {
                moves[rank * 8 + file] = find_knight_moves(bit_boards, square_mask, is_white)
            }

            // King
            if (bit_boards.get_kings()) & square_mask > 0 {
                moves[rank * 8 + file] = find_king_moves(bit_boards, square_mask, is_white)
            }
        }
    }

    moves
}

pub fn move_piece(mut bitboards: BitBoards, piece_position: &str, new_position: &str) -> BitBoards {
    // Convert string to position
    let piece_label: char = piece_position.chars().nth(0).unwrap();
    let from_file: char = piece_position.chars().nth(1).unwrap();
    let from_rank: char = piece_position.chars().nth(2).unwrap();

    let to_file: char = new_position.chars().nth(0).unwrap();
    let to_rank: char = new_position.chars().nth(1).unwrap();

    let from_file_int: u32 = from_file as u32 - 'a' as u32;
    let from_rank_int: u32 = from_rank as u32 - '0' as u32 - 1;

    let to_file_int: u32 = to_file as u32 - 'a' as u32;
    let to_rank_int: u32 = to_rank as u32 - '0' as u32 - 1;

    println!("Moving {} from {}{} to {}{}", piece_label, from_file_int, from_rank_int, to_file_int, to_rank_int);

    let from_square_mask: u64 = 0b1 << (from_rank_int * 8 + from_file_int);
    let to_square_mask: u64 = 0b1 << (to_rank_int * 8 + to_file_int);

    // Remove target square
    for index in ALL_PIECE_BOARDS {
        let bitboard: u64 = bitboards.get_bitboard(index as usize);
        if bitboard & to_square_mask > 0 {
            bitboards.set_bitboard(index as usize, bitboard & (!to_square_mask));
        }
    }

    // Move piece
    for index in ALL_PIECE_BOARDS {
        let bitboard: u64 = bitboards.get_bitboard(index as usize);
        if bitboard & from_square_mask > 0 {
            bitboards.set_bitboard(index as usize, bitboard ^ (to_square_mask | from_square_mask));
        }
    }

    bitboards
}