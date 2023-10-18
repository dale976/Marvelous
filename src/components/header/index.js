import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from '@rneui/themed';
import {avatars} from '../../../assets/avatars';


const styles = StyleSheet.create(
    {
        avatarContainer: {
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#ED1D24',
            borderRadius: 18,
            backgroundColor: "#ffb400",
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            marginTop: 16,
            marginBottom: 16,
            marginHorizontal: 16,
        },
        avatarText: {
            marginLeft: 16,
            fontWeight: 'bold',
            fontSize: 26,
        }
    }
)

export const Header = ({name, avatar}) => {
    const found = avatars.find(a => a.name === avatar);
    return (
        <View style={styles.avatarContainer}>
            <Avatar
                size={64}
                rounded
                source={found && found.logo}
            />
            <Text style={styles.avatarText}>{`Welcome back, \n${name}.`}</Text>
        </View>
    )
}
