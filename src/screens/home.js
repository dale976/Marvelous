import {
    FlatList,
    Text,
    SafeAreaView,
    View,
    SectionList,
    TouchableHighlight, ActivityIndicator
} from 'react-native';

import {useEffect, useState} from 'react';
import {getPopularCharacters, getThisWeeksComics} from '../services/api';
import {ListItem} from '../components/listItem';
import {Header} from '../components/header';
import {Navbar} from '../components/navbar/navbar';
import {getUser} from '../services/db';
import {getUserInstance} from '../services/auth';
import {commonStyles} from '../styles';


export const Home = ({navigation}) => {
    const [comics, setComics] = useState([]);
    const [characters, setCharacters] = useState({})
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

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
        getUserProfile();
    })

    const getUserProfile = async () => {
        const user = await getUser(getUserInstance().uid);
        if (user) {
            if (user.avatar !== avatar) {
                setAvatar(user.avatar);
            }
            if (user.displayName !== name) {
                setName(user.displayName);
            }
        }
    }

    const getContent = async () => {
        const data = await getThisWeeksComics();
        const parsedDataArr = data?.data.results.map((item) => ({...item, type: 'details'}));
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
                onPress={() => navigation.navigate(item.type, {selectedItem: item})}
            >
                {<ListItem title={item.title} thumbnail={item.thumbnail}/>}
            </TouchableHighlight>
        )
    }

    return (
        <SafeAreaView style={commonStyles.container}>
            <SectionList style={commonStyles.container}
                         sections={sectionData}
                         keyExtractor={(item, index) => item + index}
                         ListHeaderComponent={<Header name={name || 'hero'} avatar={avatar}/>}
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
                             <Text style={commonStyles.listTitle}>{title}</Text>
                         )}
            >
            </SectionList>
            <Navbar navigation={navigation} screen='home' />
        </SafeAreaView>
    );
}
