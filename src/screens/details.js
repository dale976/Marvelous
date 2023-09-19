import {Image, StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {getComicById} from '../services/api';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#1d2158',
    },
    item: {
        backgroundColor: '#f9c2ff',
        marginVertical: 8,
        marginHorizontal: 8,
        width: 150,
        height: 225,
    },
    title: {
        fontSize: 12,
        width: 150,
        height: 60,
        marginTop: 6,
        fontWeight: 'bold',
        color: '#ffb400',
    },
    image: {
        width: 150,
        height: 225,
    }
})

export const Details = ({ navigation, route }) => {
    const {comic} = route.params

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.item}>
            <Image
                style={styles.image}
                source={{uri:`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`}}
            />
            <Text style={styles.title}>{comic.title}</Text>
        </View>
        </SafeAreaView>
    );

}
