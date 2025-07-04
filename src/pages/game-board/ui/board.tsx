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
import { clearGame, GameState, loadGame, Puzzle, saveGame } from 'src/entities/game';

const COLOR = ['', 'red', 'green', 'yellow', 'blue', 'gray', '#00ff00', '#ff00ff', '#00ffff', '#7878FF', '#8B6331', "#9977aa", "#ad12ad"]

export const Board = ({ bottleHeight = 4, numColors = 10 }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const params = route.params as any;
    const game = params?.game as Puzzle | undefined;
    const settings = params?.settings as GameState | undefined;
    // 설정이 있으면 설정을 사용, 없으면 기본값 사용
    const finalBottleHeight = settings?.bottleHeight || bottleHeight;
    const gameAPI = new GameAPI(finalBottleHeight);

    const [puzzle, setPuzzle] = useState(() => {
        console.log('퍼즐 생성 중...'); // 한 번만 실행됨을 확인
        console.log("받은 game:", game);

        if (game && game.length > 0) {
            console.log("저장된 게임 불러오기:", game);
            return game;
        }

        // 설정이 있으면 설정을 사용, 없으면 기본값 사용
        const finalBottleHeight = settings?.bottleHeight || bottleHeight;
        const finalNumColors = settings?.numColors || numColors; // 병 개수에 맞게 색상 수 조정
        const finalNumBottles = finalNumColors + 2;


        console.log("새 게임 생성", {
            bottleHeight: finalBottleHeight,
            numBottles: finalNumBottles,
            numColors: finalNumColors
        });

        const puzzle = PuzzleGeneratorAPI.generateCustomPuzzle({
            numColors: finalNumColors,
            bottleHeight: finalBottleHeight,
            numBottles: finalNumBottles,
        });
        saveGame({ puzzle, bottleHeight: finalBottleHeight, numColors: finalNumColors, difficulty: settings?.difficulty || 'easy' });
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
        if (isSolved(puzzle, finalBottleHeight)) {
            console.log(isSolved(puzzle, finalBottleHeight));
            setIsSolved(true);
            clearGame();
        }
    }, [puzzle, finalBottleHeight]);

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
                            maxLiquidCount={finalBottleHeight}
                            onClick={() => handleBottleClick(index)}
                            isSelected={selectedIndex === index}
                            colors={colors.map(e => COLOR[e])} />
                    })}
            </View>
        </View>
    )
}