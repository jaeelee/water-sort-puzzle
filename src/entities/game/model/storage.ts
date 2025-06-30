import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameState } from './types';

const GAME_STORAGE_KEY = 'current_game';

export const saveGame = async (game: GameState) => {
    await AsyncStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(game));
};

export const loadGame = async (): Promise<GameState | null> => {
    const data = await AsyncStorage.getItem(GAME_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
};

export const clearGame = async () => {
    await AsyncStorage.removeItem(GAME_STORAGE_KEY);
}; 