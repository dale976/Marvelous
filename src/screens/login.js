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
import {FIREBASE_AUTH} from '../../FirebaseConfig';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

import logo from '../../assets/m_logo.png';

export const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        let loggedIn = false;
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            loggedIn = true;
        } catch (error) {
            loggedIn = false;
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            if (loggedIn) {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'home'}],
                });
            }
            setLoading(false)
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Account created! Check your emails!');
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
                    placeholderTextColor="white"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="white"

                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            {loading ? (<ActivityIndicator />) : (<TouchableOpacity style={styles.loginBtn} onPress={signIn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>)}
            <TouchableOpacity onPress={signUp}>
                <Text style={styles.create_button}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
        height: 150,
        width: 150,
    },
    inputView: {
        backgroundColor: "#1d2158",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        color: 'white'
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color: 'white',
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    create_button: {
        height: 30,
        marginTop: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#1d2158",
    },
    loginText: {
        color: 'white'
    }
});
