import React from 'react';
import { View, Text, Button, ScrollView } from "react-native"
import { Difficulty } from 'src/entities/game';
import { BottomPicker } from 'src/shared';
import { homeStyles } from 'src/pages/home/ui/home.styles';
import { useHome } from 'src/pages/home/lib/hooks';


export const Home = () => {
    const {
        isVisible,
        game,
        settings,
        setIsVisible,
        setSettings,
        handleResumeGame,
        handleStartNewGame
    } = useHome();

    return (
        <ScrollView style={homeStyles.container}>
            <View style={homeStyles.section}>
                <Text style={homeStyles.sectionTitle} onPress={() => setIsVisible('difficulty')}>난이도</Text>
                <Text style={homeStyles.sectionTitle}>{settings.difficulty}</Text>
                <BottomPicker<Difficulty>
                    title='난이도'
                    selectedValue={settings.difficulty}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, difficulty: value }))}
                    values={['easy', 'medium', 'hard']}
                    isVisible={isVisible === 'difficulty'}
                    setIsVisible={(isVisible) => setIsVisible(isVisible ? 'difficulty' : null)}
                />
            </View>

            <View style={homeStyles.section}>
                <Text style={homeStyles.sectionTitle} onPress={() => setIsVisible('bottleSize')}>높이</Text>
                <Text style={homeStyles.sectionTitle}>{settings.bottleHeight}</Text>
                <BottomPicker<number>
                    title='높이'
                    selectedValue={settings.bottleHeight}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, bottleHeight: value }))}
                    values={[3, 4, 5, 6, 7, 8, 9, 10]}
                    isVisible={isVisible === 'bottleSize'}
                    setIsVisible={(isVisible) => setIsVisible(isVisible ? 'bottleSize' : null)}
                />
            </View>

            <View style={homeStyles.section}>
                <Text style={homeStyles.sectionTitle} onPress={() => setIsVisible('bottleCount')}>색상 수</Text>
                <Text style={homeStyles.sectionTitle}>{settings.numColors}</Text>
                <BottomPicker<number>
                    title='색상 수'
                    selectedValue={settings.numColors}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, numColors: value }))}
                    values={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                    isVisible={isVisible === 'bottleCount'}
                    setIsVisible={(isVisible) => setIsVisible(isVisible ? 'bottleCount' : null)}
                />
            </View>

            <View style={homeStyles.buttonContainer}>
                <Button title="새 게임" onPress={handleStartNewGame} />
                {game && game.length > 0 && (
                    <Button title="이어하기" onPress={handleResumeGame} />
                )}
            </View>
        </ScrollView>
    );
};
