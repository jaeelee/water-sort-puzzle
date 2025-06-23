import { StyleSheet } from 'react-native';
import { LIQUID_HEIGHT } from '../lib/constants';

export const bottleStyles = StyleSheet.create({
    bottle: {
        alignSelf: 'flex-start',  // 자식 크기에 맞춤
        borderWidth: 1,
        padding: 1,
        borderColor: '#333',
        // borderBottomLeftRadius: 100,
        // borderBottomRightRadius: 100,
        borderBottomEndRadius: 100,
        borderBottomStartRadius: 100,
        overflow: 'hidden',
        width: '10%',
        minWidth: 40,
        margin: 10,
    },
    liquid: {
        width: '100%',
        height: LIQUID_HEIGHT,
    },
    selected: {
        borderColor: '#ff00ff',
        borderWidth: 3,

        // glow css 안먹힌다.
        // shadowColor: '#ff00ff',  // rgba(255, 0, 255, 0.8)의 색상
        // shadowOffset: {
        //     width: 0,
        //     height: 0,  // box-shadow의 0 0과 동일
        // },
        // shadowOpacity: 0.8,  // rgba의 알파값
        // shadowRadius: 20,    // blur 값
        // elevation: 20,       // Android용 (shadowRadius와 동일하게)
    },
});