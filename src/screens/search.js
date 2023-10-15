import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Navbar} from '../components/navbar/navbar';

export const Search = ({ navigation, route }) => {


    return (
        <View style={styles.container}>
            <Text>Search</Text>
            <StatusBar style="auto" />
            <Button title="Go to home" onPress={() => navigation.navigate('home')} />
            <Navbar navigation={navigation} screen='search'/>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        // marginTop: StatusBar.currentHeight || 0,
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: '#1d2158',
    },
});
