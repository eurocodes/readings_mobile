import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    HeaderContainer,
    CalendarText,
    HomeScreenContainer,
    ReadingsContainer, Text,
    TouchCalendar,
    TopText,
    FooterText,
    MediumText,
    ReadingBoldText,
    VerseText,
    PageView,
    ToastView,
    AddViewWrap
} from '../styles/home.elements';
import { TopBackground, LowerView, MessageText, View, InnerView, PrevNextContainer } from '../styles/reflections.elements';
import { fetchReflectionTextSingle } from '../apiCalls';
import monstrance from '../assets/monstrance_host.jpg';
import { Alert, Clipboard, Platform, Share } from 'react-native';
import { Indicator } from '../components/ActivityIndicator';
import { Toast } from '../components/Toast';
import Constants from 'expo-constants';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { PRODUCTION_ID, IOS_PRODUCTION_ID } from '../appKeys';
import { DateSelector } from '../components/DateSelector';


// Is a real device and running in production.
//const adUnitID = Constants.isDevice && !__DEV__ ? PRODUCTION_ID : TestIds.BANNER;
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

const Item = ({ text }) => (
    <MessageText>{text}</MessageText>
);

const ReflectionTextScreen = ({ route, navigation }) => {
    const [text, setText] = useState({})
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState("date")
    const [show, setShow] = useState(false);
    const [visibleToast, setVisibleToast] = useState(false);
    const [hasAd, setHasAd] = useState(false)
    const [hideBar, setHideBar] = useState(false)
    const today = new Date().getTime()

    useEffect(() => {
        fetchSingleText()
        setVisibleToast(false)
    }, [visibleToast])

    const { url } = route.params;
    const fetchSingleText = async () => {
        const urlStr = url;
        const response = await fetchReflectionTextSingle(urlStr, "");
        let refDate = url.split("/")
        refDate = refDate.slice(4, 5);
        refDate = refDate[0];
        refDate = refDate.split("-")
        //setDate(new Date(refDate[0], refDate[1] - 1, refDate[2]))
        setText(response)
    }

    const fetchSingleTextPrevNext = async (url) => {
        setText({});
        const response = await fetchReflectionTextSingle(url, "");
        setText(response)
    }

    const changeDate = (selectedDate) => {
        const currentDate = selectedDate.nativeEvent.timestamp || date;
        setShow(true);
        setDate(new Date(currentDate));
        fetchSingleTextDated(new Date(currentDate))

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const showDatePicker = () => {
        showMode("date");
    }

    const copyText = () => {
        setVisibleToast(true);
        const reflections = copiedReflections(text.message)
        Clipboard.setString(text.title + "\n" + text.author + "\n" + "\n" +
            text.subtitle + "\n" + "\n" + text.verses + "\n" + "\n" + reflections.join("\n\n"))
    }

    const copiedReflections = (text) => {
        const reflectionArr = [];
        for (let i = 0; i < text.length; i++) {
            reflectionArr.push(text[i]);
        }

        return reflectionArr;
    }

    const onShare = async () => {
        const reflections = copiedReflections(text.message);
        let shareUrl = "";
        if(Platform.OS.toLowerCase() == "ios"){
            shareUrl = "Download the Daily Catholic Readings And Reflections from App Store at \n \n https://apps.apple.com/ng/app/theword/";
        }
        else{
            shareUrl = "Download the Daily Catholic Readings And Reflections from Google Play at \n \n https://play.google.com/store/apps/details?id=com.ugsoft.theword";
        }
        try {
            const result = await Share.share({
                message: text.title + "\n" + text.author + "\n" + "\n" +
                    text.subtitle + "\n" + "\n" + text.verses + "\n" + "\n" + reflections.join("\n\n\n") + "\n" +
                    shareUrl,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Shared with actitvity type of " + result.activityType)
                } else {
                    console.log("Shared")
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Dismissed")
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const adRecieved = () => {
        setHasAd(true);
    }

    const hideBarToggle = (e) => {
        const currentOffset = e.nativeEvent.contentOffset.y
        let direction = currentOffset > 330 ? "down" : "up";
        if (currentOffset === 0) {
            setHideBar(false)
        }else if (direction === "down") {
            setHideBar(true);
        } else {
            setHideBar(false);
        }
        };

    return (
        <HomeScreenContainer >
            {text?.message ? <PageView onScroll={(e) => hideBarToggle(e)}>
                <HeaderContainer>
                    <TopBackground
                    >

                        <StatusBar style="light" backgroundColor="#263759" hidden={hideBar} />
                        <TopText>{text.title}</TopText>
                        <MediumText>{text.author}</MediumText>
                        <Feather name="arrow-left" size={22} color="#fff"
                            onPress={() => navigation.goBack()}
                            style={{
                                position: "absolute", top: 40, left: 16
                            }} />
                        <Feather name="copy" size={22} color="#fff"
                            onPress={() => copyText()}
                            style={{
                                position: "absolute", top: 40, right: 70
                            }} />
                        <Feather name="share-2" size={22} color="#fff"
                            onPress={onShare}
                            style={{
                                position: "absolute", top: 40, right: 30
                            }} />
                    </TopBackground>
                    {/* {show && (
                        <DateSelector 
                            platform = {Platform.OS}
                            today = {today}
                            date = {date}
                            mode = {mode}
                            changeDate = {changeDate}
                        />
                    )} */}
                </HeaderContainer>
                <PrevNextContainer>
                {text.prev && <Feather name="arrow-left" size={22} color="#263759"
                            onPress={() => fetchSingleTextPrevNext(text.prev)}
                            style={{
                                top: 15, left: 16
                            }} />}

                {text.next &&<Feather name="arrow-right" size={22} color="#263759"
                            onPress={() => fetchSingleTextPrevNext(text.next)}
                            style={{
                                top: 15, right: 16
                            }} />}
                </PrevNextContainer>
                <ReadingsContainer>
                    <LowerView>
                        <InnerView>
                            <ReadingBoldText>{text.subtitle}</ReadingBoldText>
                            <VerseText>{text.verses}</VerseText>
                        </InnerView>
                        {
                            text.message && text.message.map((text, index) => <InnerView key={index}>
                                <Item text={text} />
                            </InnerView>
                            )
                        }

                    </LowerView>
                    <FooterText>From CATHOLICDIOCESEOFWICHITA.ORG</FooterText>
                </ReadingsContainer>
                <ToastView>
                    <Toast visible={visibleToast} message="Text copied to clipboard" />
                </ToastView>
            </PageView> : <Indicator />}
            <AddViewWrap height={hasAd ? "auto": "0px"} width={hasAd ? "auto": "0px"}>
            <BannerAd
                    // It is extremely important to use test IDs as you can be banned/restricted by Google AdMob for inappropriately using real ad banners during testing
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
        </HomeScreenContainer>
    )
}

export default ReflectionTextScreen;
