import {
    ActivityIndicator,
    FlatList, SafeAreaView,
    SectionList,
    StyleSheet,
    Text,
    TextInput, TouchableHighlight,
    View
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {Icon} from '@rneui/themed';
import {searchComics} from '../services/api';
import {Navbar} from '../components/navbar/navbar';
import {commonStyles} from '../styles';

export const Search = ({navigation, route}) => {
    const [term, setTerm] = useState('');
    const [title, setTitle] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const sectionData = [
        {
            title: results.length ? `${results.length} Results for ${title}...` : '',
            data: [results]
        },
    ]


    const initiateSearch = async () => {
        setLoading(true);
        try {
            const data = await searchComics(term);
            setResults([...data.data?.results])
            setTitle(term);
            setLoading(false);
        } catch (e) {
            console.log("Comic req error: ", e)
            setLoading(false);
        }
    }

    const renderItem = (item) => {
        return (
            <TouchableHighlight
                style={commonStyles.listTextItem}
                activeOpacity={0.6}
                onPress={() => navigation.navigate('details', {selectedItem: item})}
            >
                <Text style={commonStyles.listTextItemText}>{item.title}</Text>
            </TouchableHighlight>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.inputContainer}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder={term || 'Try searching for a comic...'}
                        placeholderTextColor="#1d2158"
                        onChangeText={(n) => setTerm(n)}
                    />
                </View>
                <Icon
                    raised
                    name='search'
                    type='font-awesome'
                    color={'grey'}

                    onPress={initiateSearch}/>
            </View>
            {loading ? (<ActivityIndicator/>) : (
                <View style={styles.container}>
                    <SectionList style={{marginRight: 10, marginLeft: 10, height: "100%"}}
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
            <Navbar navigation={navigation} screen='search' />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "#1d2158",
    },
    inputContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    inputView: {
        backgroundColor: "#ffb400",
        borderRadius: 30,
        width: "70%",
        height: 50,
        alignItems: "center",
        color: '#1d2158'
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color: '#1d2158',
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        marginBottom: 10,
        color: '#ffb400',
    },
});
