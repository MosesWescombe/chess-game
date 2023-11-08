use crate::types::BitBoards;

pub fn find_pawn_moves(bit_boards: &BitBoards, position_mask: u64, is_white: bool) -> u64 {
    let mut moves: u64 = 0;

    if is_white {
        // Move directly above (current_position up one row excluding space with black piece)
        moves |= (position_mask << 8) & (!bit_boards.all_pieces);

        // Move two squares up if on initial square and no piece in front
        if position_mask & 0b1111111100000000 == position_mask  // On initial square
            && (position_mask << 8) & (!bit_boards.all_pieces) > 0 // No piece in front
        {
            moves |= (position_mask << 16) & (!bit_boards.all_pieces);
        }
    }
    if !is_white {
        moves |= (position_mask >> 8) & (!bit_boards.all_pieces);

        if position_mask & (0b11111111 << 8*6) == position_mask && (position_mask >> 8) & (!bit_boards.all_pieces) > 0 {
            moves |= (position_mask >> 16) & (!bit_boards.all_pieces);
        }
    }

    // Find all pawn captures
    let attack_mask: u64 = position_mask << 1 | position_mask >> 1;
    if is_white {
        moves |= attack_mask << 8 & bit_boards.black_pieces;
    }
    if !is_white {
        moves |= attack_mask >> 8 & bit_boards.white_pieces;
    }

    // Find all pawn en passant
    moves
}

pub fn find_knight_moves(bit_boards: &BitBoards, position_mask: u64, is_white: bool) -> u64 {
    let mut moves: u64 = 0;

    // Find all knight moves
    let horizontal_mask: u64 = position_mask << 1 | position_mask >> 1;
    let vertical_mask: u64 = position_mask << 8 | position_mask >> 8;

    moves |= horizontal_mask << 16 | horizontal_mask >> 16 | vertical_mask << 2 | vertical_mask >> 2;
 
    // Remove an self takes
    if is_white {
        moves &= !bit_boards.white_pieces;
    } else {
        moves &= !bit_boards.black_pieces;
    }

    moves
}

pub fn get_square_moves(bit_boards: &BitBoards) -> [u64; 64] {
    let mut moves: [u64; 64] = [0; 64];

    // Iterate over the squares and find the moves for each piece
    for rank in 0..8 {
        for file in 0..8 {
            let square_mask: u64 = 0b1 << (rank * 8 + file);
            let is_white = bit_boards.white_pieces & square_mask > 0;

            // Pawn
            if (bit_boards.white_pawns | bit_boards.black_pawns) & square_mask > 0 {
                moves[rank * 8 + file] = find_pawn_moves(bit_boards, square_mask, is_white)
            }

            // Pawn
            if (bit_boards.white_knights | bit_boards.black_knights) & square_mask > 0 {
                moves[rank * 8 + file] = find_knight_moves(bit_boards, square_mask, is_white)
            }
        }
    }

    moves
}

pub fn move_piece(mut bit_boards: BitBoards, piece_position: &str, new_position: &str) -> BitBoards {
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

    // print_u64_board(from_square_mask);
    // print_u64_board(to_square_mask);

    //Remove target piece
    // White
    if bit_boards.white_bishops & to_square_mask > 0 { // White bishops
        bit_boards.white_bishops &= !to_square_mask;
    } else if bit_boards.white_king & to_square_mask > 0 { // White king
        bit_boards.white_king &= !to_square_mask;
    } else if bit_boards.white_knights & to_square_mask > 0 { // White knights
        bit_boards.white_knights &= !to_square_mask;
    } else if bit_boards.white_pawns & to_square_mask > 0 { // White pawns
        bit_boards.white_pawns &= !to_square_mask;
    } else if bit_boards.white_queens & to_square_mask > 0 { // White queens
        bit_boards.white_queens &= !to_square_mask;
    } else if bit_boards.white_rooks & to_square_mask > 0 { // White rooks
        bit_boards.white_rooks &= !to_square_mask;
    } 
    
    // Black
    else if bit_boards.black_bishops & to_square_mask > 0 { // black bishops
        bit_boards.black_bishops &= !to_square_mask;
    } else if bit_boards.black_king & to_square_mask > 0 { // black king
        bit_boards.black_king &= !to_square_mask;
    } else if bit_boards.black_knights & to_square_mask > 0 { // black knights
        bit_boards.black_knights &= !to_square_mask;
    } else if bit_boards.black_pawns & to_square_mask > 0 { // black pawns
        bit_boards.black_pawns &= !to_square_mask;
    } else if bit_boards.black_queens & to_square_mask > 0 { // black queens
        bit_boards.black_queens &= !to_square_mask;
    } else if bit_boards.black_rooks & to_square_mask > 0 { // black rooks
        bit_boards.black_rooks &= !to_square_mask;
    }

    // Move pawns
    if piece_label == 'P' {
        if bit_boards.white_pawns & from_square_mask > 0 {
            bit_boards.white_pawns &= !from_square_mask;
            bit_boards.white_pawns |= to_square_mask;
        } else if bit_boards.black_pawns & from_square_mask > 0 {
            bit_boards.black_pawns &= !from_square_mask;
            bit_boards.black_pawns |= to_square_mask;
        }
    }

    // Move knights
    if piece_label == 'N' {
        if bit_boards.white_knights & from_square_mask > 0 {
            bit_boards.white_knights &= !from_square_mask;
            bit_boards.white_knights |= to_square_mask;
        } else if bit_boards.black_knights & from_square_mask > 0 {
            bit_boards.black_knights &= !from_square_mask;
            bit_boards.black_knights |= to_square_mask;
        }
    }

    bit_boards
}

pub fn recompile_boards(mut bit_boards: BitBoards) -> BitBoards {
    bit_boards.white_pieces = bit_boards.white_bishops | bit_boards.white_king | bit_boards.white_knights | bit_boards.white_pawns | bit_boards.white_queens | bit_boards.white_rooks;
    bit_boards.black_pieces = bit_boards.black_bishops | bit_boards.black_king | bit_boards.black_knights | bit_boards.black_pawns | bit_boards.black_queens | bit_boards.black_rooks;
    bit_boards.all_pieces = bit_boards.white_pieces | bit_boards.black_pieces;

    bit_boards
}