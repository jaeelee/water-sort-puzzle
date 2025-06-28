import { useState } from "react";
import { Text, View } from "react-native"
import { PuzzleGeneratorAPI } from "src/pages/game-board/lib/game-generator";
import { GameAPI } from "src/pages/game-board/lib/game-logic";
import { boardStyles } from "src/pages/game-board/ui/board.styles";
import { Bottle } from "src/pages/game-board/ui/bottle";
import { Header } from "src/shared/ui";

const COLOR = ['', 'red', 'green', 'yellow', 'blue', 'gray', '#00ff00', '#ff00ff', '#00ffff', '#7878FF', '#8B6331', "#9977aa", "#ad12ad"]

export const Board = ({ bottleHeight = 4, numColors = 10 }) => {
    const [puzzle, setPuzzle] = useState(() => {
        console.log('퍼즐 생성 중...'); // 한 번만 실행됨을 확인
        return PuzzleGeneratorAPI.generateCustomPuzzle({
            numColors,
            bottleHeight,
            numBottles: numColors + 2,
        });
    });
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const gameAPI = new GameAPI(bottleHeight);

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

    const handleBackPress = () => {
        // 뒤로가기 로직 - 현재는 콘솔 로그만 출력
        console.log('뒤로가기 버튼이 눌렸습니다.');
        // 실제로는 네비게이션 라이브러리를 사용하거나 상태를 변경해야 합니다
    };

    return (
        <View style={boardStyles.container}>

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