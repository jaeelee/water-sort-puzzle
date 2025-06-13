import React from 'react'
import { View } from 'react-native'
import { bottleStyles } from './bottle.styles'

interface Props {
    colors: Array<string>,
    isSelected?: boolean,
}

export const Bottle = ({ colors, isSelected }: Props) => {

    return (
        <View style={[bottleStyles.bottle, isSelected && bottleStyles.selected]}>
            {
                colors.map((color, index) =>
                    <View
                        key={index}
                        style={[bottleStyles.liquid, { backgroundColor: color }]}
                    />
                )
            }
        </View >
    )
}
