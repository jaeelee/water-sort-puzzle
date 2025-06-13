import { StyleSheet } from 'react-native';

export const bottleStyles = StyleSheet.create({
    bottle: {
        alignSelf: 'flex-start',  // 자식 크기에 맞춤
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 10,
        overflow: 'hidden',
    },
    liquid: {
        width: 40,
        height: 40,
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