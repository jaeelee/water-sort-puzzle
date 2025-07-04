export type Color = number; // 0: empty, 1~n: colors
export type Bottle = Color[];
export type GameState = Bottle[];

export interface Move {
    from: number;
    to: number;
    amount: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameSettings {
    difficulty: Difficulty;
    bottleSize: number; // 4-10
    bottleCount: number; // 3-20
}