import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const Settings = ({ navigation, route }) => {


    return (
        <View style={styles.container}>
            <Text>Welcome, {route.params.name}. Settings!</Text>
            <StatusBar style="auto" />
            <Button title="Go to home" onPress={() => navigation.navigate('home')} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});