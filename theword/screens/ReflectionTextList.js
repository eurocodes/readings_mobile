import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
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
    TextReflectionText,
    PageView
} from '../styles/reflections.elements';
import { AddViewWrap } from '../styles/home.elements';
import { Indicator } from '../components/ActivityIndicator';
import { PRODUCTION_ID, IOS_PRODUCTION_ID, TEST_ID } from '../appKeys';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';



// Is a real device and running in production.
const adUnitID = getAdUnitId();

function getAdUnitId(){
    if(__DEV__){
        return TestIds.BANNER;
    }

    switch(Platform.OS.toLowerCase()){
        case 'ios': return IOS_PRODUCTION_ID;
        case 'android': return PRODUCTION_ID;
        default: return "";
    }
}

const Item = ({ title, message, onPress, link }) => (
    <ViewText>
        <ReflectionTextTitle>{title}</ReflectionTextTitle>
        <TouchableOpacity onPress={() => onPress(link)}>
            <TextReflectionText>{message}</TextReflectionText>
        </TouchableOpacity>
    </ViewText>
);

const ReflectionTextList = ({ navigation }) => {


    const [hasAd, setHasAd] = useState(false)
    const [reflections, setReflections] = useState([])

    useEffect(() => {
        const fetchReflectionId = async () => {
            const response = await fetchReflectionTextList()
            setReflections(response)
        }
        fetchReflectionId()
    }, [])

    const getSingleReflection = async (link) => {
        navigation.navigate("Single Reflection", { url: link })
    }

    return (
        <ReflectionsContainer >
            <StatusBar style="light" backgroundColor="#263759" />
            {reflections != null && reflections[0] ? <PageView>
                <HeaderContainer>
                    <HeaderContent>
                        <Feather onPress={() => navigation.openDrawer()} name="menu" size={22} color="#fff" />
                        {/* <Feather name="share-2" size={22} color="#fff" /> */}
                    </HeaderContent>
                    <HeaderTextContainer>
                        <HeaderText>Daily reflections</HeaderText>
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
                                <Item
                                    title={reflection.title}
                                    message={reflection.message}
                                    onPress={getSingleReflection}
                                    link={reflection.link}
                                />
                            </RenderTextView>
                        </ItemsWrapper>)}
                    </FlatListView>
                </ScrollWrapper>
                <AddViewWrap height={hasAd ? "auto": "0px"} width={hasAd ? "auto": "0px"}>
            <BannerAd
                    unitId={adUnitID}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                    requestNonPersonalizedAdsOnly: true, 
                    // You can change this setting depending on whether you want to use the permissions tracking we set up in the initializing
                    }}
                    onAdLoaded={() => {
                    setHasAd(true);
                    }}
                />
            </AddViewWrap>
            </PageView> : <Indicator />}
        </ReflectionsContainer>
    )
}

export default ReflectionTextList;
