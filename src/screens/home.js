import {
    FlatList,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    SectionList,
    TouchableHighlight, ActivityIndicator
} from 'react-native';

import {useEffect, useState} from 'react';
import {getPopularCharacters, getThisWeeksComics} from '../services/api';
import {ListItem} from '../components/listItem';
import {Header} from '../components/header';

import {Navbar} from '../components/navbar/navbar';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#1d2158',
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        marginTop: 0,
        color: '#ffb400',
    },
    button: {
        color: '#ffb400',
    }

});

export const Home = ({navigation}) => {
    const [isFirstVisit, setIsFirstVisit] = useState();
    const [comics, setComics] = useState([]);
    const [characters, setCharacters] = useState({})
    const [loading, setLoading] = useState(false);


    const sectionData = [
        {
            title: "This weeks new releases",
            data: [comics]
        },
        {
            title: "Popular characters",
            data: [characters]
        },
    ]

    useEffect(() => {
        if (!comics.length > 0) {
            getContent();
            setLoading(true);
        }

        if (!characters.length > 0) {
            getCharacters();
            setLoading(true);
        }

    }, [comics, characters])

    useEffect(() => {
        if (!isFirstVisit) {
            setIsFirstVisit(true);
        }
    }, [isFirstVisit])

    const getContent = async () => {
        const data = await getThisWeeksComics();
        const parsedDataArr = data?.data.results.map((item) => ({...item, type: 'comic'}));
        setComics(parsedDataArr);
        setLoading(false);
    }

    const getCharacters = async () => {
        const data = await getPopularCharacters();
        const parsedDataArr = data?.data.results.map((item) => ({...item, type: 'character'}));
        setCharacters(parsedDataArr);
        setLoading(false);
    }

    const renderItem = (item) => {
        return (
            <TouchableHighlight
                activeOpacity={0.6}
                onPress={() => navigation.navigate('details', {selectedItem: item})}
            >
                {<ListItem title={item.title} thumbnail={item.thumbnail}/>}
            </TouchableHighlight>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <SectionList style={styles.container}
                         sections={sectionData}
                         keyExtractor={(item, index) => item + index}
                         ListHeaderComponent={isFirstVisit && (<Header/>)}
                         stickySectionHeadersEnabled={false}
                         renderItem={({item}) => (
                             <View>
                                 {loading && (<ActivityIndicator/>) || !loading && (<FlatList
                                     data={item}
                                     renderItem={({item}) => renderItem(item)}
                                     keyExtractor={item => item.id}
                                     horizontal={true}
                                 >
                                 </FlatList>)}
                             </View>
                         )}
                         renderSectionHeader={({section: {title}}) => (
                             <Text style={styles.listTitle}>{title}</Text>
                         )}
            >
            </SectionList>
            <Navbar navigation={navigation} screen='home' />
        </SafeAreaView>
    );
}
