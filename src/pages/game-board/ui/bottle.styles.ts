import { StyleSheet } from 'react-native';
import { LIQUID_HEIGHT } from '../lib/constants';

export const bottleStyles = StyleSheet.create({
    bottle: {
        justifyContent: 'flex-end',
        borderWidth: 3,
        borderColor: '#333',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        overflow: 'hidden',
        width: 40,
        margin: 10,
    },

    liquid: {
        width: '100%',
        height: LIQUID_HEIGHT,
    },

    // 마지막 liquid용 
    lastLiquid: {
        borderBottomEndRadius: 18,
        borderBottomStartRadius: 18,
    },

    selected: {
        borderColor: '#007AFF',         // 선택된 병 강조색
        borderWidth: 3,
    },
});