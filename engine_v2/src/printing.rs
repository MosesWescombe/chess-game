use crate::types::BitBoards;

pub fn print_ascii_board(bit_boards: &BitBoards) {
    let board_string: String = String::from(
        "\n. . . . . . . .   8\n. . . . . . . .   7\n. . . . . . . .   6\n. . . . . . . .   5\n. . . . . . . .   4\n. . . . . . . .   3\n. . . . . . . .   2\n. . . . . . . .   1\n                \na b c d e f g h"
    );

    let mut char_vec: Vec<char> = board_string.chars().collect();

    insert_piece_to_string_vector(&mut char_vec, bit_boards.white_pawns, 'p');
    insert_piece_to_string_vector(&mut char_vec, bit_boards.black_pawns, 'p');

    insert_piece_to_string_vector(&mut char_vec, bit_boards.white_king, 'k');
    insert_piece_to_string_vector(&mut char_vec, bit_boards.black_king, 'k');

    insert_piece_to_string_vector(&mut char_vec, bit_boards.black_queens, 'q');
    insert_piece_to_string_vector(&mut char_vec, bit_boards.white_queens, 'q');
    
    insert_piece_to_string_vector(&mut char_vec, bit_boards.black_rooks, 'r');
    insert_piece_to_string_vector(&mut char_vec, bit_boards.white_rooks, 'r');

    insert_piece_to_string_vector(&mut char_vec, bit_boards.black_bishops, 'b');
    insert_piece_to_string_vector(&mut char_vec, bit_boards.white_bishops, 'b');

    insert_piece_to_string_vector(&mut char_vec, bit_boards.black_knights, 'n');
    insert_piece_to_string_vector(&mut char_vec, bit_boards.white_knights, 'n');

    let result: String = char_vec.into_iter().collect();
    println!("{}", result);
}

fn insert_piece_to_string_vector(string_vector: &mut Vec<char>, bitboard: u64, icon: char) {
    for rank in 0..8 {
        for file in 0..8 {
            // Calculate the shift for the current position
            let shift = (7 - rank) * 8 + file;
            // Check if the bit at the shift position is set
            let is_set = (bitboard >> shift) & 1;
            // Calculate index in vector
            let index = rank * 20 + file * 2 + 1;
            if is_set == 1 {
                string_vector[index] = icon;
            }
        }
    }
}

pub fn print_u64_board(bitboard: u64) {
    println!();
    for rank in (0..8).rev() {
        for file in 0..8 {
            // Calculate the shift for the current position
            let shift = rank * 8 + file;
            // Check if the bit at the shift position is set
            let is_set = (bitboard >> shift) & 1;

            print!("{} ", if is_set != 0 { 'X' } else { '.' });
        }
        println!("  {}", rank + 1);
    }
    println!("\na b c d e f g h\n");
}