import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { fetchReflections, fetchYoutubeId } from '../apiCalls';
import {
    Text, View,
    ReflectionsContainer,
    TouchableOpacity,
    HeaderContainer,
    HeaderContent,
    HeaderTextContainer,
    HeaderText,
    ReflectionSearch,
    RenderListView,
    LineBreaker,
    ItemsWrapper,
    ScrollWrapper,
    FlatList, PageView,
    ListDateText
} from '../styles/reflections.elements';
import { Indicator } from '../components/ActivityIndicator';

const Item = ({ title, date }) => (
    <View>
        <ListDateText>{date}</ListDateText>
        <Text>{title}</Text>
    </View>
);

const ReflectionScreen = ({ navigation }) => {

    const [reflections, setReflections] = useState([])

    useEffect(() => {
        const fetchReflectionId = async () => {
            const response = await fetchReflections()
            setReflections(response)
        }
        fetchReflectionId()
    }, [])

    const getFrame = async (link) => {
        console.log("Link:", link)
        const response = await fetchYoutubeId(link)
        console.log("ID:", response)
        navigation.navigate("Reflection Video", { id: response })
    }

    const renderItem = ({ item }) => (
        <ItemsWrapper>
            <RenderListView>
                <Item title={item.title} date={item.date} />
                <TouchableOpacity onPress={() => getFrame(item.link)}>
                    <Feather name="eye" size={25} color="#0f2147" />
                </TouchableOpacity>
            </RenderListView>
            <LineBreaker />
        </ItemsWrapper>
    );

    return (
        <ReflectionsContainer >
            <StatusBar style="light" backgroundColor="#263759" />
            {reflections[0] ? <PageView>
                <HeaderContainer>
                    <HeaderContent>
                        <Feather onPress={() => navigation.openDrawer()} name="menu" size={22} color="#fff" />
                    </HeaderContent>
                    <HeaderTextContainer>
                        <HeaderText>Daily Reflections Videos</HeaderText>
                    </HeaderTextContainer>
                    {/* <ReflectionSearch>
                    <Feather name="search" size={22} color="#fff" />
                </ReflectionSearch> */}
                </HeaderContainer>
                <ScrollWrapper>
                    <FlatList
                        data={reflections}
                        renderItem={renderItem}
                        keyExtractor={item => String(item.id)} />
                </ScrollWrapper>
            </PageView> : <Indicator />}
        </ReflectionsContainer>
    )
}

export default ReflectionScreen;
