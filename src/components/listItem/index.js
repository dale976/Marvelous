import {Image, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
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
    logo: {
        width: 150,
        height: 225,
    },
});

export const ListItem = ({title, thumbnail}) => {
    const uri = `${thumbnail?.path}.${thumbnail?.extension}`;
    return (
        <View style={styles.item}>
            <Image
                style={styles.logo}
                source={{uri}}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    )
};
