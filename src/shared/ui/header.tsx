import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { headerStyles } from './header.styles';

interface HeaderProps {
    title: string;
    onBackPress?: () => void;
    showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    onBackPress,
    showBackButton = true
}) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={headerStyles.header}>
            <View style={headerStyles.headerContent}>
                {showBackButton && onBackPress && (
                    <TouchableOpacity
                        style={headerStyles.backButton}
                        onPress={onBackPress}
                        activeOpacity={0.7}
                    >
                        <Text style={headerStyles.backButtonText}>←</Text>
                    </TouchableOpacity>
                )}
                <Text style={headerStyles.title}>{title}</Text>
                <View style={headerStyles.rightSpace} />
            </View>
        </View>
    );
}; 