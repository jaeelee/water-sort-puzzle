
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from "react";
import { RootStackParamList } from 'src/app/navigation/types';
import { Puzzle, GameState, loadGame } from 'src/entities/game';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const useHome = () => {
    const navigation = useNavigation<NavigationProp>();
    const [isVisible, setIsVisible] = useState<string | null>(null);
    const [game, setGame] = useState<Puzzle>([]);
    const [settings, setSettings] = useState<Omit<GameState, 'puzzle'>>({
        difficulty: 'easy',
        bottleHeight: 4,
        numColors: 3,
    });

    const handleStartNewGame = () => {
        navigation.navigate('Game', { settings });
    };

    const handleResumeGame = () => {
        navigation.navigate('Game', { game, settings });
    };

    useFocusEffect(
        useCallback(() => {
            loadGame().then((savedGame) => {
                const { puzzle, difficulty, bottleHeight, numColors } = savedGame || {};
                setGame(puzzle || [])
                setSettings({
                    difficulty: difficulty || 'easy',
                    bottleHeight: bottleHeight || 4,
                    numColors: numColors || 3,
                })
            });
        }, [])
    );

    return {
        isVisible, game, settings, setIsVisible, setSettings, handleStartNewGame, handleResumeGame
    };

}