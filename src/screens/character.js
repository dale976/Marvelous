import {
    ImageBackground,
    SafeAreaView,
    Text,
    View,
    FlatList,
    SectionList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LinearGradient} from "expo-linear-gradient"
import {commonStyles} from '../styles';


export const Character = ({navigation, route}) => {
    const {selectedItem} = route.params
    const [comics, setComics] = useState([]);
    const image = {uri: `${selectedItem?.thumbnail?.path}.${selectedItem?.thumbnail?.extension}`};

    const sectionData = [
        {
            title: "Appears in",
            data: [comics]
        }
    ]

    useEffect(() => {
        if (!comics.length) {
            setComics(selectedItem.comics?.items);
        }
    })

    const renderItem = (item) => {
        return (
            <View style={commonStyles.listTextItem}>
                <Text style={commonStyles.listTextItemText}>{item.name}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={commonStyles.container}>
            <ImageBackground source={image} style={commonStyles.imgBackground}>
                <LinearGradient
                    colors={['transparent', '#1d2158']}
                    start={[1, 0]}
                    end={[0.4, 0.5]}
                    location={[0.25, 0.4, 1]}
                    style={commonStyles.linearGradient}
                >
                    <View style={commonStyles.metaDataContainer}>
                        <Text style={commonStyles.title}>{selectedItem.name}</Text>
                        <SectionList
                            sections={sectionData}
                            keyExtractor={(item, index) => item + index}
                            stickySectionHeadersEnabled={false}
                            renderItem={({item}) => (
                                <View>
                                    <FlatList
                                        data={item}
                                        renderItem={({item}) => renderItem(item)}
                                        keyExtractor={item => item.name}
                                    >
                                    </FlatList>
                                </View>
                            )}
                            renderSectionHeader={({section: {title}}) => (
                                <Text style={commonStyles.listTitle}>{title}</Text>
                            )}
                        >
                        </SectionList>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView>
    );
}
