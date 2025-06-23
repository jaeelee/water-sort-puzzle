import { useState } from "react";
import { View } from "react-native"
import { Bottle } from "src/entities/bottle"
import { generatePuzzle, isSolved } from "../lib/game-generator";
import { boardStyles } from "./board.styles";


const dump: { [key: string]: string[]; } = {
    bottle_1: ['red', 'blue', 'green', 'yellow',],
    bottle_2: ['red', 'blue', 'green', 'yellow',],
    bottle_3: ['red', 'blue', 'green', 'yellow',],
    bottle_4: [],
    bottle_5: []
}
const COLOR = ['red', 'red', 'green', 'yellow', 'blue',]

export const Board = () => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const puzzle = generatePuzzle(7);
    console.log(puzzle)
    console.log(isSolved(puzzle))
    return (
        <View style={boardStyles.board}>
            {
                puzzle.map((colors, index) => {
                    return <Bottle
                        key={index}
                        maxLiquidCount={4}
                        onClick={() => selectedIndex === index ?
                            setSelectedIndex(-1) :
                            setSelectedIndex(index)}
                        isSelected={selectedIndex === index}
                        colors={colors.map(e => COLOR[e])} />
                })}
        </View>
    )
}