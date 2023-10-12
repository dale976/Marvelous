import {
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    FlatList,
    SectionList,
    TouchableHighlight, ActivityIndicator
} from 'react-native';
import {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient"
import {ListItem} from '../components/listItem';
import {getCharacters} from '../services/api'

const styles = StyleSheet.create({
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
    textContainer: {
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
})

export const Details = ({ navigation, route }) => {
    const {comic} = route.params
    const [characters, setCharacters] = useState({});
    const [loading, setLoading] = useState(false);
    const image = {uri: `${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`};

    const sectionData = [
        {
            title: "Characters",
            data: [characters.data?.results]
        }
    ]

    useEffect(() => {
        if (!characters.data && comic?.characters?.available > 0) {
            setLoading(true);
            fetchCharacters()
        }
    })

    const fetchCharacters = async () => {
        const data = await getCharacters(comic.id);
        setLoading(false);
        setCharacters(data);
    }

    const getSaleDate = (dates) => {
        const saleDate = dates.find(d => d.type === 'onsaleDate');
        let date;
        if (saleDate) {
            date = new Date(saleDate.date);
        }
        return date.toDateString() || null;
    }

    const getSalePrice = (prices) => {
        const salePrice = prices.find(p => p.type === 'printPrice');
        return salePrice ? salePrice.price : null

    }

    const renderItem = (item) => {
        return (
            <TouchableHighlight
                activeOpacity={0.6}
                onPress={() => navigation.navigate('details', {comic: item})}
            >
                {<ListItem title={item.title} thumbnail={item.thumbnail}/>}
            </TouchableHighlight>
        )
    }


    return ( image &&
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.imgBackground}>
                    <LinearGradient
                        colors={['transparent', '#1d2158']}
                        start={[1, 0]}
                        end={[0.4, 0.5]}
                        location={[0.25, 0.4, 1]}
                        style={styles.linearGradient}
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{comic.title}</Text>
                            <View style={{flexDirection: "row"}}><Text style={styles.text}>On Sale: {getSaleDate(comic?.dates)}</Text><Text style={styles.text}>£{getSalePrice(comic?.prices)}</Text></View>
                            {loading && <ActivityIndicator />}
                            {characters.data?.results && <SectionList
                                         sections={sectionData}
                                         keyExtractor={(item, index) => item + index}
                                         stickySectionHeadersEnabled={false}
                                         renderItem={({item}) => (
                                             <View>
                                                 <FlatList
                                                     data={item}
                                                     renderItem={({item}) => renderItem(item)}
                                                     keyExtractor={item => item.id}
                                                     horizontal={true}
                                                 >
                                                 </FlatList>
                                             </View>
                                         )}
                                         renderSectionHeader={({section: {title}}) => (
                                             <Text style={styles.listTitle}>{title}</Text>
                                         )}
                            >
                            </SectionList>}
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}
