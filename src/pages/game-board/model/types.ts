export type Color = number; // 0: empty, 1~n: colors
export type Bottle = Color[];
export type GameState = Bottle[];

export interface Move {
    from: number;
    to: number;
    amount: number;
}
