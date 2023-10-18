import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {Navbar} from '../components/navbar/navbar';
import React, {useEffect, useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import {getUserInstance, logout} from '../services/auth';
import {Avatar} from '@rneui/themed';
import {avatars} from '../../assets/avatars';
import {getUser, updateUser} from '../services/db';


export const Settings = ({navigation, route}) => {

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        if (!name && !avatar) {
            onEntry();
        }
    });

    const onSignOut = async () => {
        await logout();
        navigation.reset({
            index: 0,
            routes: [{name: 'login'}],
        });
    }

    const onSave = async () => {
        const uid = await getUserInstance().uid;
        await updateUser(uid, {displayName: name, avatar: avatar})
    }

    const onEntry = async () => {
        const user = await getUser(getUserInstance().uid);
        if (user) {
            setName(user.displayName);
            setAvatar(user.avatar);
            getLogo(user.avatar);
        }
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
            <View>
                <Text style={{color: '#ffb400', marginBottom: 6}}>Your display name</Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={name || 'Name.'}
                    placeholderTextColor="#1d2158"
                    onChangeText={(n) => setName(n)}
                />
            </View>
            <Text style={{color: '#ffb400', marginBottom: 6}}>Choose your Hero</Text>
            <SelectDropdown
                data={avatars.map(a => a.name)}
                buttonStyle={styles.inputView}
                buttonTextStyle={{...styles.TextInput, textAlignVertical: 'center', textAlign: 'center'}}
                defaultButtonText={avatar || 'Choose an avatar'}
                onSelect={(selectedItem, index) => {
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
            {icon && (<Avatar
                size={64}
                rounded
                source={icon}
            />)}
            <TouchableOpacity onPress={onSave} style={styles.saveButton}>
                <Text style={{color: '#1d2158'}}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSignOut} style={styles.signOutButton}>
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
    signOutButton: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 90,
        backgroundColor: "rgba(255, 180, 0, 0.7)",
    },
    saveButton: {
        width: "70%",
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
