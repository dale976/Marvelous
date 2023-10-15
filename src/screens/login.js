import {StatusBar} from "expo-status-bar";
import React, {useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity, ActivityIndicator,
} from 'react-native';


import logo from '../../assets/m_logo.png';
import {isSignedIn, signIn, signUp} from '../services/auth';

export const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const onSignIn = async () => {
        setLoading(true);
        try {
            await signIn(email, password);
        } catch (error) {
            console.log('Sign in error: ', error.message);
        } finally {
            if (isSignedIn()) {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'home'}],
                });
            }
            setLoading(false)
        }
    }

    const onSignUp = async () => {
        setLoading(true);
        try {
            await signUp(email, password);
        } catch (error) {
            console.log(error)
            alert('Signup Failed: ' + error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={logo}/>
            <StatusBar style="auto"/>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#1d2158"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#1d2158"

                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            {loading ? (<ActivityIndicator />) : (<TouchableOpacity style={styles.loginBtn} onPress={onSignIn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>)}
            <TouchableOpacity onPress={onSignUp}>
                <Text style={styles.create_button}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1d2158",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
        height: 150,
        width: 150,
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
    forgot_button: {
        height: 30,
        marginBottom: 30,
        color: '#ffb400'
    },
    create_button: {
        height: 30,
        marginTop: 30,
        color: '#ffb400'
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#ffb400",
    },
    loginText: {
        color: '#1d2158'
    }
});
