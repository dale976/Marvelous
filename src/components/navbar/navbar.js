import {Icon} from '@rneui/themed';
import {View} from 'react-native';
import {useEffect, useState} from 'react';

export const Navbar = ({navigation, screen}) => {
    const [active, setActive] = useState('home')

    useEffect(() => {
        setActive(screen);
    })

    const onMenuItemPressed = (name) => {
        setActive(name)
        navigation.navigate(name)
    }

    return (
        <View style={{position: 'absolute', bottom: 0 + 30, width: '100%'}}>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Icon
                raised
                name='home'
                type='font-awesome'
                color={active === 'home' ? 'red' : 'grey'}
                onPress={() => onMenuItemPressed('home')} />
            <Icon
                raised
                name='search'
                type='font-awesome'
                color={active === 'search' ? 'red' : 'grey'}
                onPress={() => onMenuItemPressed('search')} />
            <Icon
                raised
                name='heart'
                type='font-awesome'
                color={active === 'heart' ? 'red' : 'grey'}
                onPress={() => onMenuItemPressed('heart')} />
            <Icon
                raised
                name='user'
                type='font-awesome'
                color={active === 'settings' ? 'red' : 'grey'}
                onPress={() => onMenuItemPressed('settings')} />
        </View>
        </View>
    );
}
