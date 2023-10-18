import {StyleSheet} from 'react-native';
import {StatusBar} from 'expo-status-bar';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#1d2158',
    },
    imgBackground: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    metaDataContainer: {
        flex: 1,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        marginTop: 300,
        width: "100%",
    },
    title: {
        fontSize: 18,
        height: 60,
        width: 'auto',
        fontWeight: 'bold',
        color: '#ffb400',
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'left'
    },
    text: {
        fontSize: 14,
        height: 60,
        width: 'auto',
        fontWeight: 'bold',
        color: '#ffb400',
        marginLeft: 20,
        marginRight: 6,
        textAlign: 'left'
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 0,
        color: '#ffb400',
    },
    listTextItem: {
        flex: 0,
        justifyContent: 'center',
        height: 60,
        borderRadius: 15,
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 16,
        marginRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: 'rgba(29, 33, 12, 0.3)'
    },
    listTextItemText: {
        color: "#ffb400",
        fontSize: 14
    }
})
