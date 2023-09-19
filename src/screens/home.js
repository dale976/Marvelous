import {
    FlatList,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    SectionList,
    TouchableHighlight
} from 'react-native';

import {useEffect, useState} from 'react';
import {getLatestEvents, getPopularCharacters, getThisWeeksComics} from '../services/api';
import {ListItem} from '../components/listItem';
import {Header} from '../components/header';

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
        marginTop: 16,
        color: '#ffb400',
    },

});

export const Home = ({navigation}) => {
    const [isFirstVisit, setIsFirstVisit] = useState();
    const [newComics, setNewComics] = useState({});
    const [characters, setCharacters] = useState({})
    const [events, setEvents] = useState({});

    const sectionData = [
        {
            title: "This weeks new releases",
            data: [newComics.data?.results]
        },
        {
            title: "Popular characters",
            data: [characters.data?.results]
        },
        {
            title: "Latest events",
            data: [events.data?.results]
        }
    ]

    useEffect(() => {
        if (!newComics.data) {
            getContent();
        }

        if (!characters.data) {
            getCharacters();
        }

        if (!events.data) {
            getEvents();
        }

    }, [newComics, characters])

    useEffect(() => {
        if (!isFirstVisit) {
            setIsFirstVisit(true);
        }
    }, [isFirstVisit])

    const getContent = async () => {
        const data = await getThisWeeksComics();
        setNewComics(data);
    }

    const getCharacters = async () => {
        const data = await getPopularCharacters();
        setCharacters(data);
    }

    const getEvents = async () => {
        const data = await getLatestEvents();
        setEvents(data);
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

    return (
        <SafeAreaView style={styles.container}>
            <SectionList style={styles.container}
                         sections={sectionData}
                         keyExtractor={(item, index) => item + index}
                         ListHeaderComponent={<Header/>}
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
            </SectionList>
        </SafeAreaView>
    );
}
