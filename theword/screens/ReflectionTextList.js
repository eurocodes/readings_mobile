import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { fetchReflectionTextList } from '../apiCalls';
import {
    ReflectionsContainer,
    TouchableOpacity,
    HeaderContainer,
    HeaderContent,
    HeaderTextContainer,
    HeaderText,
    FlatListView,
    ItemsWrapper,
    ScrollWrapper,
    RenderTextView,
    ViewText,
    ReflectionTextTitle,
    TextReflectionText
} from '../styles/reflections.elements';
import { PageView } from '../styles/home.elements';
import { Indicator } from '../components/ActivityIndicator';

const Item = ({ title, message }) => (
    <ViewText>
        <ReflectionTextTitle>{title}</ReflectionTextTitle>
        <TextReflectionText>{message}</TextReflectionText>
    </ViewText>
);

const ReflectionTextList = ({ navigation }) => {

    const [reflections, setReflections] = useState([])

    useEffect(() => {
        const fetchReflectionId = async () => {
            const response = await fetchReflectionTextList()
            setReflections(response)
        }
        fetchReflectionId()
    }, [])

    const getSingleReflection = async (link) => {
        console.log(link)
        navigation.navigate("Single Reflection", { url: link })
    }

    return (
        <ReflectionsContainer >
            <StatusBar style="light" backgroundColor="#263759" />
            {reflections[0] ? <PageView>
                <HeaderContainer>
                    <HeaderContent>
                        <Feather onPress={() => navigation.openDrawer()} name="menu" size={22} color="#fff" />
                        <Feather name="share-2" size={22} color="#fff" />
                    </HeaderContent>
                    <HeaderTextContainer>
                        <HeaderText>Read reflections fron few days ago</HeaderText>
                    </HeaderTextContainer>
                    {/* <ReflectionSearch>
                    <Feather name="search" size={22} color="#fff" />
                </ReflectionSearch> */}
                </HeaderContainer>
                <ScrollWrapper>
                    <FlatListView>
                        {/* <FlatList
                    data={reflections}
                    renderItem={renderItem}
                    keyExtractor={item => String(item.id)}
                /> */}
                        {reflections.map((reflection) => <ItemsWrapper key={reflection.id}>
                            <RenderTextView>
                                <TouchableOpacity onPress={() => getSingleReflection(reflection.link)}>
                                    <Item title={reflection.title} message={reflection.message} />
                                </TouchableOpacity>
                            </RenderTextView>
                        </ItemsWrapper>)}
                    </FlatListView>
                </ScrollWrapper>
            </PageView> : <Indicator />}
        </ReflectionsContainer>
    )
}

export default ReflectionTextList;
