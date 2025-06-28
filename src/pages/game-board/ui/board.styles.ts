import { StyleSheet } from "react-native";

export const boardStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    board: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',        // 줄바꿈 허용
        paddingHorizontal: 30,
        paddingVertical: 30,
        justifyContent: 'center',
        alignContent: 'center'
    }
});