import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>This is not so great!</Text>
            <StatusBar style="auto" />
            <Button
                title="Go to Jane's profile"
                onPress={() =>
                    navigation.navigate('profile', { name: 'Jane' })
                }
            />
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