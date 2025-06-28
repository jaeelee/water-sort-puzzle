import { View, Text, Button } from "react-native"
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    Game: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {
    const navigation = useNavigation<NavigationProp>();

    return <View style={{ height: '100%', width: '100%' }}>
        <Text>Home</Text>
        <Button title="Go to Game" onPress={() => navigation.navigate('Game')} />
    </View>
}

