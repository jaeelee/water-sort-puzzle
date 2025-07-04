
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
    puzzle: number[][];
    bottleHeight: number;
    numColors: number;
    difficulty: Difficulty;
    // 필요한 경우 추가 상태
}