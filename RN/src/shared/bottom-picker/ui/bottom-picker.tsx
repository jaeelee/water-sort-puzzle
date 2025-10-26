import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Button, Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import { pickerStyles } from 'src/shared/bottom-picker/ui/bottom-picker.styles';

interface PickerProps<T extends string | number> {
    title?: string;
    selectedValue: T;
    onValueChange: (value: T) => void;
    values: T[];
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

export function BottomPicker<T extends string | number>({ title, selectedValue, onValueChange, values, isVisible, setIsVisible }: PickerProps<T>) {

    const [selected, setSelected] = useState(selectedValue);

    useEffect(() => {
        setSelected(selectedValue);
    }, [selectedValue]);

    return (
        <Modal
            transparent
            animationType='slide'
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
                <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
                    <TouchableWithoutFeedback>
                        <View style={pickerStyles.bottomPickerContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>{title}</Text>
                                <Button title='❌' onPress={() => setIsVisible(false)} />
                            </View>
                            <View style={pickerStyles.pickerContainer}>
                                <Picker
                                    selectedValue={selected}
                                    onValueChange={setSelected}
                                    style={pickerStyles.picker}
                                >
                                    {values.map((value) => (
                                        <Picker.Item key={String(value)} label={String(value)} value={value} />
                                    ))}
                                </Picker>
                            </View>
                            <Button title='확인' onPress={() => {
                                onValueChange(selected);
                                setIsVisible(false);
                            }} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    );
}
