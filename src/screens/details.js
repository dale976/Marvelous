import {
    ImageBackground,
    SafeAreaView,
    Text,
    View,
    FlatList,
    SectionList,
    TouchableHighlight, ActivityIndicator
} from 'react-native';
import {useEffect, useState} from 'react';
import {LinearGradient} from "expo-linear-gradient"
import {ListItem} from '../components/listItem';
import {getCharacters} from '../services/api'
import {Icon} from '@rneui/themed';
import {containsFavourite, getFavourites, setFavourites} from '../services/favourites';
import {commonStyles} from '../styles';


export const Details = ({navigation, route}) => {
    const {selectedItem} = route.params
    const [isFavourite, setIsFavourite] = useState(false);
    const [characters, setCharacters] = useState({});
    const [loading, setLoading] = useState(false);
    const image = {uri: `${selectedItem?.thumbnail?.path}.${selectedItem?.thumbnail?.extension}`};

    const sectionData = [
        {
            title: "Featuring",
            data: [characters.data?.results]
        }
    ]

    useEffect(() => {
        fetchFavourites();

        if (!characters.data && selectedItem?.characters?.available > 0) {
            setLoading(true);
            fetchCharacters()
        }
    })

    const fetchFavourites = async () => {
        const value = await containsFavourite(selectedItem.id)
        setIsFavourite(value);
    }

    const onFavouritePressed = async () => {
        const favourites = await getFavourites()
        if (isFavourite) {
            const idx = favourites.findIndex(f => f.id === selectedItem?.id)
            favourites.splice(idx, 1)
        } else {
            favourites.push({id: selectedItem.id, title: selectedItem.title});
        }
        await setFavourites(favourites)
        setIsFavourite(!isFavourite)
    }

    const fetchCharacters = async () => {
        const data = await getCharacters(selectedItem.id);
        setLoading(false);
        setCharacters(data);
    }

    const getSaleDate = (dates) => {
        if (!dates) return null;
        const saleDate = dates.find(d => d.type === 'onsaleDate');
        let date;
        if (saleDate) {
            date = new Date(saleDate.date);
        }
        return date.toDateString() || null;
    }

    const getSalePrice = (prices) => {
        if (!prices) return null;
        const salePrice = prices.find(p => p.type === 'printPrice');
        return salePrice ? salePrice.price : null
    }

    const renderItem = (item) => {
        return (
            <TouchableHighlight
                activeOpacity={0.6}
                onPress={() => navigation.navigate('character', {selectedItem: item})}
            >
                {<ListItem title={item.title} thumbnail={item.thumbnail}/>}
            </TouchableHighlight>
        )
    }
    return (image &&
        <SafeAreaView style={commonStyles.container}>
            <View style={commonStyles.container}>

                <ImageBackground source={image} style={commonStyles.imgBackground}>
                    <LinearGradient
                        colors={['transparent', '#1d2158']}
                        start={[1, 0]}
                        end={[0.4, 0.5]}
                        location={[0.25, 0.4, 1]}
                        style={commonStyles.linearGradient}
                    >
                        <View style={{alignSelf: 'flex-end'}}>
                            <Icon
                                raised
                                name='heart'
                                type='font-awesome'
                                color={isFavourite ? 'red' : 'grey'}
                                onPress={() => onFavouritePressed()}/>
                        </View>
                        <View style={commonStyles.metaDataContainer}>
                            <Text style={commonStyles.title}>{selectedItem.title}</Text>
                            <View style={{flexDirection: "row"}}><Text style={commonStyles.text}>On
                                Sale: {getSaleDate(selectedItem?.dates)}</Text><Text
                                style={commonStyles.text}>£{getSalePrice(selectedItem?.prices)}</Text></View>
                            {loading && <ActivityIndicator/>}
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
                                    <Text style={commonStyles.listTitle}>{title}</Text>
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
