import { StyleSheet } from 'react-native';

export const pickerStyles = StyleSheet.create({
    bottomPickerContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#333',
        padding: 16,
        borderRadius: 16,
    },
    pickerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#333',
        overflow: 'hidden',
    },
    picker: {
        color: 'white',
        backgroundColor: 'transparent',
    },
}); 