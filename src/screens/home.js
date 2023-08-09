import {FlatList, Image, Text, SafeAreaView, StatusBar, StyleSheet, View, ScrollView, SectionList} from 'react-native';

import deadPoolIcon from '../../assets/avatars/dead_pool_icon.png';
import {useEffect, useState} from 'react';
import {getLatestEvents, getPopularCharacters, getThisWeeksComics} from '../services/api';
import {Avatar} from '@rneui/themed';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#1d2158',
    },
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
        // flexWrap: 'wrap',
        marginTop: 6,
        fontWeight: 'bold',
        color: '#ffb400',
    },
    logo: {
        width: 150,
        height: 225,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        marginTop: 16,
        color: '#ffb400',
    },
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
});

const Item = ({title, thumbnail}) => {
    const uri = `${thumbnail.path}.${thumbnail.extension}`;
    return (
        <View style={styles.item}>
            <Image
                style={styles.logo}
                source={{uri}}
            />
            {/*<Text style={styles.title}>{title}</Text>*/}
        </View>
    )
};


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
        // console.log('New Comics:', data);
        setNewComics(data);
    }

    const getCharacters = async () => {
        const data = await getPopularCharacters();
        // console.log('Characters: ', data);
        setCharacters(data);
    }

    const getEvents = async () => {
        const data = await getLatestEvents();
        // console.log('EVents: ', data);
        setEvents(data);
    }

    const headerComponent = () => {
        return (
            <View style={styles.avatarContainer}>
                <Avatar
                    size={64}
                    rounded
                    source={deadPoolIcon}
                />
                <Text style={styles.avatarText}>{"Welcome back, \nAlan."}</Text>

            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <SectionList style={styles.container}
                         sections={sectionData}
                         keyExtractor={(item, index) => item + index}
                         ListHeaderComponent={headerComponent}
                         stickySectionHeadersEnabled={false}
                         renderItem={({item}) => (
                             <View>
                                 <FlatList
                                     data={item}
                                     renderItem={({item}) => <Item title={item.title} thumbnail={item.thumbnail}/>}
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
