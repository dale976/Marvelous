import {
    ActivityIndicator,
    FlatList,
    SafeAreaView, SectionList,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Navbar} from '../components/navbar/navbar';
import React, {useEffect, useState} from 'react';
import {getFavourites} from '../services/favourites';
import {getComicById} from '../services/api';
import {commonStyles} from '../styles';


export const Favourites = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const [favourites, setFavourites] = useState([]);

    const sectionData = [
        {
            title: favourites.length ? `Your Favourites` : 'Why not try adding some favourites',
            data: [favourites]
        },
    ]

    useEffect(() => {
        if (!favourites.length) {
            fetchFavourites();
        }
    })

    const fetchFavourites = async () => {
        setLoading(true);
        const results = await getFavourites();
        setFavourites(results);
        setLoading(false);
    }

    const onFavouriteSelected = async (item) => {
        setLoading(true);
        const comic = await getComicById(item.id);
        setLoading(false);
        navigation.navigate('details', {selectedItem: comic?.data?.results[0]})
    }

    const renderItem = (item) => {
        return (
            <TouchableHighlight
                style={commonStyles.listTextItem}
                activeOpacity={0.6}
                onPress={() => onFavouriteSelected(item)}
            >
                <Text style={commonStyles.listTextItemText}>{item.title}</Text>
            </TouchableHighlight>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            {loading ? (<ActivityIndicator/>) : (
                <View style={styles.container}>
                    <SectionList style={{marginTop: 40, marginRight: 10, marginLeft: 10, height: "100%"}}
                                 sections={sectionData}
                                 keyExtractor={(item, index) => item + index}
                                 stickySectionHeadersEnabled={false}
                                 renderItem={({item}) => (
                                     <View>
                                         <FlatList
                                             data={item}
                                             renderItem={({item}) => renderItem(item)}
                                             keyExtractor={item => item.id}
                                         >
                                         </FlatList>
                                     </View>
                                 )}
                                 renderSectionHeader={({section: {title}}) => (
                                     <Text style={styles.listTitle}>{title}</Text>
                                 )}
                    >
                    </SectionList>
                </View>
            )}
            <Navbar navigation={navigation} screen='favourites' />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#1d2158",
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        marginBottom: 10,
        color: '#ffb400',
    }
});
