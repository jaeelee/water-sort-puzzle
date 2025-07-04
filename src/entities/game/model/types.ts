
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Color = number; // 0: empty, 1~n: colors
export type Bottle = Color[];
export type Puzzle = Bottle[];

export interface GameState {
    puzzle?: Puzzle;
    bottleHeight: number;
    numColors: number;
    difficulty: Difficulty;
    // 필요한 경우 추가 상태
}