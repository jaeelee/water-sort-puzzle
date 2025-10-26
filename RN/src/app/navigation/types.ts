import { Puzzle } from "src/entities/game";
import { GameState } from "src/entities/game";

export type RootStackParamList = {
    Home: undefined;
    Game: { game?: Puzzle, settings?: GameState } | undefined;
};
