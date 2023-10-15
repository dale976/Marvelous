import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {Navbar} from '../components/navbar/navbar';
import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import {logout} from '../services/auth';
import {Avatar} from '@rneui/themed';
import {avatars} from '../../assets/avatars';
import {storeData} from '../services/storage';


export const Settings = ({navigation, route}) => {

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        if (avatar && !icon) {
            getLogo(avatar);
        }

        storeData({
            avatar,
            name,
        })
    }, [name, avatar]);

    const onSignOut = async () => {
        await logout();
        navigation.reset({
            index: 0,
            routes: [{name: 'login'}],
        });
    }

    const getLogo = (name) => {
        const found = avatars.find(a => a.name === name);
        if (found) {

            setIcon(found.logo);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={name || 'Name.'}
                    placeholderTextColor="#1d2158"
                    onChangeText={(n) => setName(n)}
                />
            </View>
            <SelectDropdown
                data={avatars.map(a => a.name)}
                buttonStyle={styles.inputView}
                buttonTextStyle={{...styles.TextInput, textAlignVertical: 'center', textAlign: 'center'}}
                defaultButtonText={avatar || 'Choose an avatar'}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    setAvatar(selectedItem);
                    getLogo(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
            />
            <Avatar
                size={64}
                rounded
                source={icon}
            />
            <TouchableOpacity onPress={onSignOut} style={styles.sign_out_button}>
                <Text style={{color: '#1d2158'}}>Sign Out</Text>
            </TouchableOpacity>
            <Navbar navigation={navigation} screen='settings'/>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#1d2158",
        alignItems: "center",
        justifyContent: "center",

    },
    sign_out_button: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
        backgroundColor: "#ffb400",
    },
    inputView: {
        backgroundColor: "#ffb400",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        color: '#1d2158'
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color: '#1d2158',
    },
});
