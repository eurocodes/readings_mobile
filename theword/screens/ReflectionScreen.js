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
    FlatListView,
    LineBreaker,
    ItemsWrapper,
    ScrollWrapper
} from '../styles/reflections.elements';

const Item = ({ title, link }) => (
    <View>
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
        const response = await fetchYoutubeId(link)
        navigation.navigate("Reflection Video", { id: response })
    }

    return (
        <ReflectionsContainer >
            <StatusBar style="light" backgroundColor="#263759" />
            <HeaderContainer>
                <HeaderContent>
                    <Feather onPress={() => navigation.openDrawer()} name="menu" size={22} color="#fff" />
                    <Feather name="share-2" size={22} color="#fff" />
                </HeaderContent>
                <HeaderTextContainer>
                    <HeaderText>Reflectional Videos from few days ago</HeaderText>
                </HeaderTextContainer>
                {/* <ReflectionSearch>
                    <Feather name="search" size={22} color="#fff" />
                </ReflectionSearch> */}
            </HeaderContainer>
            <ScrollWrapper>
                <FlatListView>
                    {reflections.map((reflection) => <ItemsWrapper key={reflection.id}>
                        <RenderListView>
                            <Item title={reflection.title} />
                            <TouchableOpacity onPress={() => getFrame(reflection.link)}>
                                <Feather name="eye" size={25} color="#0f2147" />
                            </TouchableOpacity>
                        </RenderListView>
                        <LineBreaker />
                    </ItemsWrapper>)}
                </FlatListView>
            </ScrollWrapper>

        </ReflectionsContainer>
    )
}

export default ReflectionScreen;
