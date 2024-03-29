import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Details, Home, Favourites, Login, Search, Settings, Character} from './src/screens';
import {ThemeProvider} from '@rneui/themed';
import {LogBox} from 'react-native';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name='login'
                        component={Login}
                        options={{title: 'Sign In'}}
                        initialParams={{foo: 'bar'}}

                    />
                    <Stack.Screen
                        name='home'
                        component={Home}
                        options={{title: 'Home'}}

                    />
                    <Stack.Screen
                        name='details'
                        component={Details}
                        options={{title: 'Details'}}
                    />
                    <Stack.Screen
                        name='character'
                        component={Character}
                        options={{title: 'Character'}}
                    />
                    <Stack.Screen
                        name='search'
                        component={Search}
                        options={{title: 'Search'}}
                    />
                    <Stack.Screen
                        name='favourites'
                        component={Favourites}
                        options={{title: 'Favourites'}}
                    />
                    <Stack.Screen
                        name='settings'
                        component={Settings}
                        options={{title: 'Settings'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}


