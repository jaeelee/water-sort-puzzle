import React from 'react';
import { Button } from 'react-native';

export const ResumeGameButton = ({ onPress }: { onPress: () => void }) => (
    <Button title="이어하기" onPress={onPress} />
); 