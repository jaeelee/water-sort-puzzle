import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from "react-native"
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from "react";
import { GameState, loadGame } from 'src/entities/game';
import { GameSettings, Difficulty } from 'src/pages/game-board/model/types';
import { BottomPicker } from 'src/shared';

type RootStackParamList = {
    Home: undefined;
    Game: { game?: GameState; settings?: GameSettings } | undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {
    const navigation = useNavigation<NavigationProp>();
    const [game, setGame] = useState<GameState | undefined>(undefined);
    const [settings, setSettings] = useState<GameSettings>({
        difficulty: 'easy',
        bottleSize: 4,
        bottleCount: 3
    });

    useFocusEffect(
        React.useCallback(() => {
            loadGame().then((savedGame) => {
                setGame(savedGame || undefined);
            });
        }, [])
    );

    const handleStartNewGame = () => {
        navigation.navigate('Game', { settings });
    };

    const handleResumeGame = () => {
        navigation.navigate('Game', { game });
    };
    const [isVisible, setIsVisible] = useState<string | null>(null);

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle} onPress={() => setIsVisible('difficulty')}>난이도</Text>
                    <Text style={styles.sectionTitle}>{settings.difficulty}</Text>
                    <BottomPicker<Difficulty>
                        title='난이도'
                        selectedValue={settings.difficulty}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, difficulty: value }))}
                        values={['easy', 'medium', 'hard']}
                        isVisible={isVisible === 'difficulty'}
                        setIsVisible={(isVisible) => setIsVisible(isVisible ? 'difficulty' : null)}
                    />

                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle} onPress={() => setIsVisible('bottleSize')}>병의 크기</Text>
                    <Text style={styles.sectionTitle}>{settings.bottleSize}</Text>
                    <BottomPicker<number>
                        title='병의 크기'
                        selectedValue={settings.bottleSize}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, bottleSize: value }))}
                        values={[3, 4, 5, 6, 7, 8, 9, 10]}
                        isVisible={isVisible === 'bottleSize'}
                        setIsVisible={(isVisible) => setIsVisible(isVisible ? 'bottleSize' : null)}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle} onPress={() => setIsVisible('bottleCount')}>병의 개수</Text>
                    <Text style={styles.sectionTitle}>{settings.bottleCount}</Text>
                    <BottomPicker<number>
                        title='병의 개수'
                        selectedValue={settings.bottleCount}
                        onValueChange={(value) => setSettings(prev => ({ ...prev, bottleCount: value }))}
                        values={[3, 4, 5, 6, 7, 8, 9, 10]}
                        isVisible={isVisible === 'bottleCount'}
                        setIsVisible={(isVisible) => setIsVisible(isVisible ? 'bottleCount' : null)}
                    />

                </View>

                <View style={styles.buttonContainer}>
                    <Button title="새 게임" onPress={handleStartNewGame} />
                    {game && (
                        <Button title="이어하기" onPress={handleResumeGame} />
                    )}
                </View>
            </ScrollView>

        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1a1a1a',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },

    buttonContainer: {
        marginTop: 20,
        gap: 10,
    },
});

