import {ScrollView, View} from 'react-native';

import deadPoolIcon from '../../assets/avatars/dead_pool_icon.png';
import {useEffect, useState} from 'react';
import {getComics} from '../services/api';
import {Box, VStack} from '../components';



export const Home = ({navigation}) => {
    const LeftContent = props => <Avatar.Image {...props} size={28} source={deadPoolIcon}/>

    const [isFirstVisit, setIsFirstVisit] = useState();
    const [newComics, setNewComics] = useState({});

    useEffect(() => {
        if (!newComics.data) {
            console.log("kjahsdjkashdkjahdkjhasdjk")
            getContent();
        }
    }, [newComics])

    useEffect(() => {
        if (!isFirstVisit) {
            setIsFirstVisit(true);
        }
    }, [isFirstVisit])

    const getContent = async () => {
        const data =  await getComics();
        console.log('DATA:', data)
        setNewComics(data);
    }

    const generateComicCard = (comic) => {
        // console.log('COMIC: ', comic)
        // return (
        //     // <div key={comic.id}>
        //     //     <Text variant="titleLarge">{comic.title}</Text>
        //     // </div>
        // );
    }
    return (
        <ScrollView>
            <Box h="$80" justifyContent="center">
                <VStack space="md" reversed={false}>
                    <Box w="$20" h="$20" bg="$blue300" />
                    <Box w="$20" h="$20" bg="$blue400" />
                    <Box w="$20" h="$20" bg="$blue500" />
                    <Box w="$20" h="$20" bg="$blue500" />
                    <Box w="$20" h="$20" bg="$blue500" />
                    <Box w="$20" h="$20" bg="$blue500" />
                    <Box w="$20" h="$20" bg="$blue500" />
                    <Box w="$20" h="$20" bg="$blue500" />
                    <Box w="$20" h="$20" bg="$blue500" />
                    <Box w="$20" h="$20" bg="$blue500" />
                    <Box w="$20" h="$20" bg="$blue500" />
                    <Box w="$20" h="$20" bg="$blue500" />
                    <Box w="$20" h="$20" bg="$blue500" />
                    <Box w="$20" h="$20" bg="$blue500" />
                </VStack>
            </Box>

            {/*{newComics.data?.results && newComics.data?.results.map(c => generateComicCard(c))}*/}
        </ScrollView>
    );
}
