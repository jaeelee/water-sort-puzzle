import React from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Home } from 'src/pages/home';
import { Board } from 'src/pages/game-board';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */

  console.log("DEV 모드", __DEV__);
  console.log("환경:", process.env.NODE_ENV);

  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: backgroundStyle.backgroundColor,
            },
            contentStyle: {
              backgroundColor: backgroundStyle.backgroundColor,
            },
            headerTintColor: isDarkMode ? Colors.lighter : Colors.darker,
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="Game"
            component={Board}
            options={{ title: '' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;