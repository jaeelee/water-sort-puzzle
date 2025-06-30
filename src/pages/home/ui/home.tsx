import React from 'react';
import { View, Text, Button } from "react-native"
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from "react";
import { GameState, loadGame } from 'src/entities/game';

type RootStackParamList = {
    Home: undefined;
    Game: { game?: GameState } | undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {
    const navigation = useNavigation<NavigationProp>();
    const [game, setGame] = useState<GameState | null>(null);

    useFocusEffect(
        React.useCallback(() => {
            loadGame().then(setGame);
        }, [])
    );

    return <View style={{ height: '100%', width: '100%' }}>
        <Text>Home</Text>
        <Button title="새 게임" onPress={() => navigation.navigate('Game')} />
        {game && <Button title="이어하기" onPress={() => navigation.navigate('Game', { game })} />}
    </View>
}

