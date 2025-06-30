import React, { useEffect } from 'react';
import { useState } from "react";
import { View } from "react-native"
import { PuzzleGeneratorAPI } from "src/pages/game-board/lib/game-generator";
import { GameAPI } from "src/pages/game-board/lib/game-logic";
import { boardStyles } from "src/pages/game-board/ui/board.styles";
import { Bottle } from "src/pages/game-board/ui/bottle";
import { useNavigation, useRoute } from '@react-navigation/native';
import { isSolved } from 'src/pages/game-board/lib/game-solver';
import { GameExitModal } from 'src/features/game-exit';
import { GameCompleteModal } from 'src/features/game-exit/ui/game-complete-modal';
import { clearGame, loadGame, saveGame } from 'src/entities/game';
import type { GameState } from 'src/entities/game';

const COLOR = ['', 'red', 'green', 'yellow', 'blue', 'gray', '#00ff00', '#ff00ff', '#00ffff', '#7878FF', '#8B6331', "#9977aa", "#ad12ad"]

export const Board = ({ bottleHeight = 4, numColors = 10 }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const game = (route.params as any)?.game as GameState | undefined;
    const gameAPI = new GameAPI(bottleHeight);

    const [puzzle, setPuzzle] = useState(() => {
        console.log('퍼즐 생성 중...'); // 한 번만 실행됨을 확인
        console.log("받은 game:", game);

        if (game) {
            console.log("저장된 게임 불러오기:", game.puzzle);
            return game.puzzle;
        }

        console.log("새 게임 생성");
        const puzzle = PuzzleGeneratorAPI.generateCustomPuzzle({
            numColors,
            bottleHeight,
            numBottles: numColors + 2,
        });
        saveGame({ puzzle, bottleHeight, numColors });
        return puzzle;
    });
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [solved, setIsSolved] = useState(false);

    const handleBottleClick = (index: number) => {
        if (selectedIndex > -1) {
            if (selectedIndex === index) {
                setSelectedIndex(-1);
                return;
            }

            console.log(`병 ${selectedIndex} → 병 ${index} 이동 시도`);
            const result = gameAPI.autoMoveLiquid(puzzle, selectedIndex, index);

            if (result.success && result.newState) {
                setPuzzle(result.newState);
                setSelectedIndex(-1);
                console.log(`이동 성공: ${result.actualAmount}개 이동`);
            } else {
                console.log(`이동 실패: ${result.error}`);
                setSelectedIndex(-1);
            }
        } else {
            if (puzzle[index].length === 0) {
                console.log('빈 병은 선택할 수 없습니다.');
                return;
            }
            if (puzzle[index].length === bottleHeight && puzzle[index].every(color => color === puzzle[index][0])) {
                console.log('모든 병이 같은 색상입니다.');
                return;
            }

            setSelectedIndex(index);
            console.log(`병 ${index} 선택됨`);
        }
    };

    useEffect(() => {
        if (isSolved(puzzle, bottleHeight)) {
            console.log(isSolved(puzzle, bottleHeight));
            setIsSolved(true);
            clearGame();
        }
    }, [puzzle]);

    return (
        <View style={boardStyles.container}>
            <GameExitModal
                visible={false}
                onCancel={() => { }}
                onConfirm={() => {
                    navigation.goBack();
                }}
            />
            <GameCompleteModal
                visible={solved}
                onCancel={() => { }}
                onConfirm={() => {
                    navigation.goBack();
                }}
            />
            <View style={boardStyles.board}>
                {
                    puzzle.map((colors, index) => {
                        return <Bottle
                            key={index}
                            maxLiquidCount={4}
                            onClick={() => handleBottleClick(index)}
                            isSelected={selectedIndex === index}
                            colors={colors.map(e => COLOR[e])} />
                    })}
            </View>
        </View>
    )
}