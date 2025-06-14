import { useState } from "react";
import { View } from "react-native"
import { Bottle } from "src/entities/bottle"


const dump: { [key: string]: string[]; } = {
    bottle_1: ['red', 'blue', 'green', 'yellow',],
    bottle_2: ['red', 'blue', 'green', 'yellow',],
    bottle_3: ['red', 'blue', 'green', 'yellow',],
    bottle_4: [],
    bottle_5: []
}

export const Board = () => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <View >
            {
                Object.entries(dump).map(([key, colors], index) => {
                    return <Bottle
                        key={index}
                        maxLiquidCount={4}
                        onClick={() => selectedIndex === index ?
                            setSelectedIndex(-1) :
                            setSelectedIndex(index)}
                        isSelected={selectedIndex === index}
                        colors={colors} />
                })}
        </View>
    )
}