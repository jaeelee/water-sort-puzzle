import { StyleSheet } from "react-native";

export const boardStyles = StyleSheet.create({
    board: {
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',        // 줄바꿈 허용
        paddingHorizontal: 30,
        paddingVertical: 30,
        justifyContent: 'center',
        alignContent: 'center'
    }
});