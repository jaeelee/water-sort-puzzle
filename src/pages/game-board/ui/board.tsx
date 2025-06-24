import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native"
import { PuzzleGeneratorAPI } from "src/pages/game-board/lib/game-generator";
import { isSolved, printSolution, solvePuzzle } from "src/pages/game-board/lib/game-solver";
import { boardStyles } from "src/pages/game-board/ui/board.styles";
import { Bottle } from "src/pages/game-board/ui/bottle";

const COLOR = ['', 'red', 'green', 'yellow', 'blue', 'gray', '#00ff00', '#ff00ff', '#00ffff', '#7878FF', '#8B6331']

export const Board = () => {
    const puzzle = useMemo(() => PuzzleGeneratorAPI.generateCustomPuzzle({
        numColors: 10,
        bottleHeight: 4,
        numBottles: 12
    }), []);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    useEffect(() => {
        const solution = solvePuzzle(puzzle);
        console.log('Solution:', solution);
        printSolution(solution);

        console.log(puzzle)
        console.log(isSolved(puzzle))

    }, [])

    const handleBottleClick = useCallback((index: number) => {
        setSelectedIndex(prev => prev === index ? -1 : index);
    }, []);


    return (
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
    )
}