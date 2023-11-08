use crate::types::{BitBoards, ALL_PIECE_BOARDS};

pub fn print_ascii_board(bit_boards: &BitBoards) {
    let board_string: String = String::from(
        "\n. . . . . . . .   8\n. . . . . . . .   7\n. . . . . . . .   6\n. . . . . . . .   5\n. . . . . . . .   4\n. . . . . . . .   3\n. . . . . . . .   2\n. . . . . . . .   1\n                \na b c d e f g h"
    );

    let mut char_vec: Vec<char> = board_string.chars().collect();

    for index in ALL_PIECE_BOARDS {
        let bitboard: u64 = bit_boards.get_bitboard(index as usize);
        insert_piece_to_string_vector(&mut char_vec, bitboard, index.to_label());
    }

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