import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Favourites, Search, Settings} from './src/screens';
import {GluestackUIProvider} from './src/components';
import {config} from './gluestack-ui.config';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <GluestackUIProvider config={config.theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name='home'
                        component={Home}
                        options={{title: 'Home'}}
                    />
                    {/*<Stack.Screen*/}
                    {/*    name='search'*/}
                    {/*    component={Search}*/}
                    {/*    options={{title: 'Search'}}*/}
                    {/*/>*/}
                    {/*<Stack.Screen*/}
                    {/*    name='favourites'*/}
                    {/*    component={Favourites}*/}
                    {/*    options={{title: 'Favourites'}}*/}
                    {/*/>*/}
                    {/*<Stack.Screen*/}
                    {/*    name='settings'*/}
                    {/*    component={Settings}*/}
                    {/*    options={{title: 'Settings'}}*/}
                    {/*/>*/}
                </Stack.Navigator>
            </NavigationContainer>
        </GluestackUIProvider>
    );
}


