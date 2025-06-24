import React from 'react'
import { Pressable, View } from 'react-native'
import { LIQUID_HEIGHT } from 'src/pages/game-board/lib/constants';
import { bottleStyles } from 'src/pages/game-board/ui/bottle.styles';

interface Props {
    onClick: () => void,
    colors: Array<string>,
    isSelected?: boolean,
    maxLiquidCount: number,

}

export const Bottle = React.memo(({ onClick, maxLiquidCount, colors, isSelected }: Props) => {

    return (
        <Pressable
            style={[
                bottleStyles.bottle,
                isSelected && bottleStyles.selected,
                { height: maxLiquidCount * LIQUID_HEIGHT + 25 }
            ]}
            onPress={onClick}
        >

            {
                colors.map((color, index) => {
                    const isLast = index === colors.length - 1;
                    return <View
                        key={index}
                        style={[bottleStyles.liquid, { backgroundColor: color, },
                        isLast && bottleStyles.lastLiquid]}
                    />
                }
                )
            }

        </Pressable >
    )
})
